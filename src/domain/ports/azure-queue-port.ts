

export interface IAzureQueuePort {
    sendMessage(message: string): Promise<void>
    readMessage(): Promise<void>
}

