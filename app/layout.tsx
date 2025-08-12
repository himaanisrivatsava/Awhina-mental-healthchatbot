import "./global.css"

export const metadata ={
    title: 'Chatbot Bot',
    description:"you mental health companion"
}

const RootLayout = ({children})=>{
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}

export default RootLayout