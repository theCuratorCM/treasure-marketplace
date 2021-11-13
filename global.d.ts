interface RequestArguments {
  method: string
  params?: unknown[] | object
}

type HandlerFunction = (args: string[]) => void

type Ethereum = {
  request<T>(arg: RequestArguments): Promise<T>
  on(event: string, handler: HandlerFunction): void
  removeListener(event: string, handler: HandlerFunction): void
}

declare global {
  interface Window {
    ethereum?: Ethereum
  }
}

export {}
