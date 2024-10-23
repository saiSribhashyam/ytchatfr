import { ChatInterfaceComponent } from "@/components/chat-interface";
import { ThemeProvider } from 'next-themes';


export default function Home() {
  return (
    <>    
    <ThemeProvider attribute="class">
    <ChatInterfaceComponent></ChatInterfaceComponent>
    </ThemeProvider>
    </>
  );
}


