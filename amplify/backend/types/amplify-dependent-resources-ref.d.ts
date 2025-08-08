export type AmplifyDependentResourcesAttributes = {
  "api": {
    "FinnhubAPI": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "SummarizerAPI": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "function": {
    "finnhubProxy": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "summarizeArticle": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}