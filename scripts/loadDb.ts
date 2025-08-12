import { DataAPIClient } from "@datastax/astra-db-ts"
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer"
import {OpenAI} from "openai"

import { RecursiveCharacterTextSplitter} from "langchain/text_splitter"

import "dotenv/config"

type SimilarityMetric="dot_product"|"cosine"|"euclidean"

const {
    OPENAI_API_KEY,
    ASTRA_DB_NAMESPACE,
    ASTRA_DB_COLLECTION,
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN,
} = process.env

const openai = new OpenAI({ apiKey: OpenAI.OPENAI_API_KEY} )

const awhinaData=[
    'https://datasets-server.huggingface.co/rows?dataset=Amod%2Fmental_health_counseling_conversations&config=default&split=train&offset=0&length=100',
    'https://datasets-server.huggingface.co/splits?dataset=Amod%2Fmental_health_counseling_conversations',
    'https://datasets-server.huggingface.co/rows?dataset=marmikpandya%2Fmental-health&config=default&split=train&offset=0&length=100',
    'https://datasets-server.huggingface.co/rows?dataset=PrinceAyush%2FMental_Health_conv&config=default&split=train&offset=0&length=100',
    'https://mhanational.org/time-talk-tips-talking-about-your-mental-health',
    'https://github.com/nbertagnolli/counsel-chat/blob/master/data/20200325_counsel_chat.csv',
    'https://github.com/nbertagnolli/counsel-chat/blob/master/data/counsel_chat_250-tokens_full.json',
    'https://github.com/behavioral-data/Empathy-Mental-Health/blob/master/dataset/emotional-reactions-reddit.csv',
]

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT,{ keyspace: ASTRA_DB_NAMESPACE})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100,
})
const createCollection = async (similarityMetric: SimilarityMetric="dot_product") => {
   const res=  await db.createCollection(ASTRA_DB_COLLECTION,{
       vector:{
           dimension: 1536,
           metric:similarityMetric
       }
   })
    console.log(res)
}

const loadSampleData=async()=>{
    const collection = db.collection(ASTRA_DB_COLLECTION)
    for await(const url of awhinaData ){
        const content = await scrapePage(url);
        const chunks = await splitter.splitText(content)
        for await (const chunk of chunks){
            const embedding = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: chunk,
                encoding_format:"float"
            })

            const vector = embedding.data[0].embedding

            const res = await collection.insertOne({
                $vector: vector,
                text: chunk,
            })
            console.log(res)
        }
    }
}

const scrapePage = async(url:string)=>{
    const loader = new PuppeteerWebBaseLoader(url,{
        launchOptions: {
            headless: true
        },
        gotoOptions:{
            waitUntil: "domContentLoaded"
        },
        evaluate: async(page, browser) =>{
            const result = await page.evaluate(()=>document.body.innerHTML)
            await browser.close()
            return result
        }
    })
    return (await loader.scrape())?.replace(/<[^>]*>?/gm, '')
}

createCollection().then(()=> loadSampleData())
