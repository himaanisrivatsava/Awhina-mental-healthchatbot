"use client"
import Image from "next/image"
import chatbotlogo1 from "./assets/chatbotlogo1.png"
import {useChat} from "ai/react"
import {Message} from "ai"
import Bubble from "./components/Bubble"
import LoadingBubble from "./components/LoadingBubble"
import PromptSuggestionRow from "./components/PromptSuggestionRow"

const Home=()=>{
    const {append,isLoading,messages,input,handleInputChange,handleSubmit}= useChat()
    const noMessages = !messages || messages.length===0

    const handlePrompt = (promptText:string) => {
        const msg:Message = {
            id:crypto.randomUUID(),
            content: promptText,
            role:"user",
        }
        append(msg)
    }


    return(
        <main>
            <Image src ={chatbotlogo1} width={"250"} alt ="awhina logo" ></Image>
            <section className={noMessages ? "" : "populated"}>
                {noMessages ? (
                    <>
                        <p className="starter-text">
                            tell me anything
                        </p>
                        <br/>
                        <PromptSuggestionRow/>
                    </>
                ) : (
                    <>
                        {messages.map((message,index) => <Bubble key={'message-${index}'} message={message}/>)}
                        {isLoading && <LoadingBubble/>}
                    </>
                )}
            </section>
            <form onSubmit={handleSubmit}>
                <input className="question-box" onChange={handleInputChange} value={input} placeholder="Tell me anything" />
                <input type="submit"/>
             </form>
        </main>
    )
}


