"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SendIcon,
  HistoryIcon,
  ChevronRightIcon,
  SunIcon,
  MoonIcon,
  SaveIcon,
  PlayIcon,
  MessageCirclePlusIcon,
  RefreshCwIcon,
  Volume2Icon,
  StopCircleIcon,
  Trash2Icon,
  XIcon,
  YoutubeIcon,
  BrainCircuitIcon,
  MessageSquareIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast, useToast } from "@/hooks/use-toast";

interface ChatHistoryItem {
  chatId: string;
  message: string;
  history: { sender: string; message: string }[];
  videoInfo: {
    title: string;
    description: string;
    id: string;
    author_thumbnail: string;
    author: { name: string; author_thumbnail: string };
    thumbnail: string;
  } | null;
  url: string;
}

function DescriptionWithSeeMore({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 150;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[500px]" : "max-h-[100px]"
        }`}
      >
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {description.length > charLimit && (
        <button
          onClick={toggleDescription}
          className="text-primary text-sm font-semibold focus:outline-none mt-1 hover:underline"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
}

function TypingAnimation() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
    </div>
  );
}

function AITypingEffect({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    try {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, text.length/10000000000);

        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.error("Error in AI Typing Effect:", error);
      toast({
        title: "Error Generating Response",
        description: `Start New Chat`,
        variant: "destructive",
      });
    }
  }, [currentIndex, text]);

  return <ReactMarkdown>{displayText}</ReactMarkdown>;
}

export function ChatInterfaceComponent() {
  const [url, setUrl] = useState("");
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState<
  { sender: string; message: string; isNew?: boolean }[]
  >([])
  const [inputMessage, setInputMessage] = useState("");
  const [videoInfo, setVideoInfo] = useState<{
    title: string;
    description: string;
    id: string;
    author_thumbnail: string;
    author: { name: string, author_thumbnail: string};
    thumbnail: string;
  } | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isStartingChat, setIsStartingChat] = useState(false);
  const { toast } = useToast();
  const [isReading, setIsReading] = useState(false);
  const [showSuggestedQuestions, setShowSuggestedQuestions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  

  const suggestedQuestions = [
    "Generate a summary of the video",
    "What are the key takeaways?",
    "Explain the main topic in simple terms",
    "What are the most important points discussed?",
    "Can you provide a brief overview of the video content?",
  ];

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading, showSuggestedQuestions]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("chatHistory");
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory));
    }
  }, []);

  const newChat = async () => {
    saveChat()
    setChatId("");
    setMessages([]);
    setVideoInfo(null);
    setShowSuggestedQuestions(false);
  };

  const backlink='https://ytchatbackend-h3efhzdhazg3h9b7.southindia-01.azurewebsites.net'
<<<<<<< HEAD
  // const backlink='http://localhost:8000'
=======
>>>>>>> a2fdf178f320ea70abcf9453b8f972918d9f478f

  const startChat = async (urlToUse = url) => {
    setIsStartingChat(true);
    try {
      const response = await fetch(backlink+"/startchat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urlAddress: urlToUse }),
      });
      const data = await response.json();
      console.log(data)
      setChatId(data.chatId);
      setVideoInfo(data.info);
      setMessages([
        {
          sender: "AI",
          message: "Chat started. How can I help you with this video?",
        },
      ]);
      setUrl(urlToUse);
      setShowSuggestedQuestions(true);
      saveChat();
    } catch (error) {
      console.error("Error starting chat:", error);
      toast({
        title: "Error Starting Chat",
        description: `Internal Server Error`,
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsStartingChat(false);
    }
  };

  const sendMessage = async (messageToSend = inputMessage) => {
    if (!messageToSend.trim()) return;
  
    setMessages((prev) => [
      ...prev,
      { sender: "user", message: messageToSend, isNew: true },
    ]);
    setInputMessage("");
    setIsLoading(true);
    setShowSuggestedQuestions(false);
  
    try {
      const response = await fetch(backlink+"/chatroute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, message: messageToSend }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: "AI", message: data.response, isNew: true },
      ]);
      saveChat();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error Sending Message",
        description: `Internal Server Error`,
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateResponse = async () => {
    if (messages.length < 2) return;

    const lastUserMessage = messages[messages.length - 2].message;
    setMessages((prev) => prev.slice(0, -1));
    setIsLoading(true);

    try {
      const response = await fetch(backlink+"/chatroute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, message: lastUserMessage }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: "AI", message: data.response },
      ]);
      saveChat();
    } catch (error) {
      console.error("Error regenerating response:", error);
      toast({
        title: "Error Regenerating Response",
        description: `Internal Server Error`,
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveChat = () => {
    try {
      if (chatId) {
        const existingChatIndex = chatHistory.findIndex(
          (item) => item.chatId === chatId
        );

        const newHistoryItem: ChatHistoryItem = {
          chatId,
          message: `Last accessed: ${new Date().toLocaleString()}`,
          history: messages,
          videoInfo,
          url,
        };

        let updatedHistory = [...chatHistory];

        if (existingChatIndex > -1) {
          updatedHistory[existingChatIndex] = newHistoryItem;
        } else {
          updatedHistory = [newHistoryItem, ...updatedHistory];
        }

        setChatHistory(updatedHistory);
        localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
      }
    } catch (error) {
      console.error("Error saving chat:", error);
      toast({
        title: "Error Saving Chat",
        description: `Internal Server Error`,
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const deleteChat = (chatIdToDelete: string) => {
    try {
      if (chatIdToDelete === chatId) {
        setChatId("");
        setMessages([]);
        setVideoInfo(null);
      }
      const updatedHistory = chatHistory.filter(
        (item) => item.chatId !== chatIdToDelete
      );
      setChatHistory(updatedHistory);
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
      toast({
        title: "Deleted Successfully",
        description: `Chat deleted successfully`,
        variant: "default",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast({
        title: "Error Deleting",
        description: `Error deleting chat`,
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const deleteAllChats = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
    toast({
      title: "Deleted Successfully",
      description: "All chats deleted successfully",
      variant: "default",
      duration: 2000,
    });
  };

  const continueChat = (historyItem: ChatHistoryItem) => {
    setChatId(historyItem.chatId);
    // Mark all history messages as not new
    setMessages(historyItem.history.map(msg => ({ ...msg, isNew: false })));
    setVideoInfo(historyItem.videoInfo);
    setShowHistory(false);
    toast({
      title: "Continuing Chat",
      description: `Resumed previous chat`,
      variant: "default",
      duration: 3000,
    });
  };

  function handleReadAloud(message: string) {
    const synth = window.speechSynthesis;

    if (isReading) {
      synth.cancel();
      setIsReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.onend = () => setIsReading(false);
    synth.speak(utterance);
    setIsReading(true);
  }

  

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full mx-auto bg-background text-foreground">
      <div
        className={`flex flex-col ${
          showHistory && !isMobile ? "md:w-3/4" : "w-full"
        } p-4 transition-all duration-300`}
      >
        <header className="flex justify-between items-center mb-4 pb-2 border-b">
          <h1
            className="text-2xl md:text-3xl font-extrabold hover:cursor-pointer text-primary"
            onClick={newChat}
          >
            ▶ YT Chat
          </h1>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size={isMobile ? "icon" : "sm"}
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
              {!isMobile && (
                <span className="ml-2">
                  {theme === "dark" ? "Light" : "Dark"}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size={isMobile ? "icon" : "sm"}
              onClick={toggleHistory}
            >
              {showHistory ? (
                <ChevronRightIcon className="h-4 w-4" />
              ) : (
                <HistoryIcon className="h-4 w-4" />
              )}
              {!isMobile && (
                <span className="ml-2">{showHistory ? "Hide" : "History"}</span>
              )}
            </Button>
            {chatId && (
              <Button
                variant="ghost"
                size={isMobile ? "icon" : "sm"}
                onClick={saveChat}
              >
                <SaveIcon className="h-4 w-4" />
                {!isMobile && <span className="ml-2">Save</span>}
              </Button>
            )}
            <Button
              variant="ghost"
              size={isMobile ? "icon" : "sm"}
              onClick={newChat}
            >
              <MessageCirclePlusIcon className="h-4 w-4" />
              {!isMobile && <span className="ml-2">New</span>}
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-grow flex flex-col overflow-hidden">
          {!chatId ? (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">
                  Welcome to YT Chat
                </CardTitle>
                <CardDescription className="text-center">
                  Your AI-powered YouTube video discussion assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <Input
                      placeholder="Paste YouTube URL here"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-grow"
                    />
                    {isStartingChat ? (
                      <Button disabled className="w-full md:w-auto">
                        <TypingAnimation />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => startChat()}
                        className="w-full md:w-auto bg-primary hover:bg-primary/90"
                      >
                        Start Chat
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <YoutubeIcon className="mr-2 h-5 w-5 text-red-500" />
                          YouTube Integration
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Discuss any YouTube video by simply pasting its URL.
                          YT Chat will analyze the video content for you.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <BrainCircuitIcon className="mr-2 h-5 w-5 text-purple-500" />
                          AI-Powered Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Get intelligent responses and insights about the video
                          content, powered by advanced AI technology.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <MessageSquareIcon className="mr-2 h-5 w-5 text-blue-500" />
                          Interactive Discussions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Engage in dynamic conversations about the video, ask
                          questions, and explore topics in depth.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Developed by <a className="font-bold" target="blank" href="https://sai-sribhashyam.netlify.app">Venkata Anantha Sai Sribhashyam</a></p>
                    <p>Version 1.0.0 | © 2024 All Rights Reserved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {videoInfo && (
                <Card className="mb-4 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="w-full">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoInfo?.id}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="rounded-t-lg"
                      ></iframe>
                    </div>
                    <div className="p-4 space-y-4">
                      <h2 className="font-semibold text-lg md:text-xl">
                        {videoInfo?.title}
                      </h2>
                      <div className="flex items-center space-x-4">
                        <img
                          src={videoInfo?.author.author_thumbnail}
                          alt="Author thumbnail"
                          className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                        />
                        <div>
                          <h4 className="text-xs md:text-sm font-normal text-muted-foreground">
                            Author
                          </h4>
                          <h4 className="text-sm md:text-base font-semibold">
                            {videoInfo?.author?.name}
                          </h4>
                        </div>
                      </div>
                      <DescriptionWithSeeMore
                        description={videoInfo?.description || ""}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              <ScrollArea
                className="flex-grow mb-4 border rounded-md p-4"
                ref={scrollAreaRef}
              >
                {messages.map((msg, index) => (
  <div
    key={index}
    className={`mb-4 flex ${
      msg.sender === "user" ? "justify-end" : "justify-start"
    }`}
  >
    <div
      className={`p-3 rounded-2xl max-w-[90%] md:max-w-[80%] ${
        msg.sender === "user"
          ? "bg-primary text-primary-foreground rounded-br-none"
          : "bg-secondary rounded-bl-none"
      }`}
    >
      {msg.sender === "AI" ? (
        <>
          {msg.isNew ? (
            <AITypingEffect text={msg.message} />
          ) : (
            <ReactMarkdown>{msg.message}</ReactMarkdown>
          )}
          <div className="flex space-x-2 mt-2 items-center">
            <button
              onClick={() => {
                navigator.clipboard.writeText(msg.message);
                toast({ title: "Copied to clipboard!" });
              }}
              className="text-muted-foreground hover:text-foreground transition duration-200"
              title="Copy to clipboard"
            >
              <FontAwesomeIcon icon={faCopy} className="h-3 w-3" />
            </button>
            {index === messages.length - 1 && (
              <button
                onClick={regenerateResponse}
                className="text-muted-foreground hover:text-foreground transition duration-200"
                title="Regenerate response"
              >
                <RefreshCwIcon className="h-3 w-3" />
              </button>
            )}
            <button
              onClick={() => handleReadAloud(msg.message)}
              className="text-muted-foreground hover:text-foreground transition duration-200"
              title="Read Aloud"
            >
              {isReading ? (
                <StopCircleIcon className="h-3 w-3" />
              ) : (
                <Volume2Icon className="h-3 w-3" />
              )}
            </button>
          </div>
        </>
      ) : (
        <ReactMarkdown>{msg.message}</ReactMarkdown>
      )}
    </div>
  </div>
))}
                {showSuggestedQuestions && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Suggested Questions:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => sendMessage(question)}
                          className="text-sm"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <TypingAnimation />
                  </div>
                )}
              </ScrollArea>

              <div className="flex space-x-2 mb-4">
                <Input
                  placeholder="Type your message here"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    e.key === "Enter" && sendMessage()
                  }
                  className="flex-grow"
                />
                 
                <Button
                  onClick={() => sendMessage()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </ScrollArea>
      </div>

      {/* History panel */}
      <div
        className={`${
          showHistory
            ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:relative md:inset-auto md:bg-transparent md:backdrop-blur-none"
            : "hidden"
        } ${
          isMobile ? "w-full" : "md:w-1/4"
        } h-full bg-muted/50 overflow-hidden transition-all duration-300`}
      >
        <ScrollArea className="h-full p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Chat History</h2>
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={toggleHistory}>
                <XIcon className="h-6 w-6" />
              </Button>
            )}
          </div>
          {chatHistory.length > 0 ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="mb-4 w-full"
                onClick={deleteAllChats}
              >
                <Trash2Icon className="mr-2 h-4 w-4" />
                Delete All Chat History
              </Button>
              {chatHistory.map((historyItem, index) => (
                <Card
                  key={index}
                  className="mb-4 hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium flex justify-between items-center">
                      <span className="truncate">
                        {historyItem.videoInfo?.title || "Untitled Chat"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(
                          historyItem.message.split(": ")[1]
                        ).toLocaleDateString()}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {historyItem.videoInfo && (
                      <>
                        <img
                          src={historyItem.videoInfo.thumbnail}
                          alt="Video thumbnail"
                          className="h-50 w-full object-cover rounded-lg mb-2"
                        />
                        <p className="text-xs text-muted-foreground mb-2">
                          Video: {historyItem.videoInfo.title}
                        </p>
                      </>
                    )}
                    <p className="text-xs mb-2">{historyItem.message}</p>
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => continueChat(historyItem)}
                      >
                        <PlayIcon className="h-4 w-4 mr-2" />
                        Continue Chat
                      </Button>
                     
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteChat(historyItem.chatId)}
                      >
                        Delete Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <p className="text-muted-foreground text-sm">
              No chat history available.
            </p>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
