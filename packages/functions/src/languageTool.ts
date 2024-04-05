import fetch from 'node-fetch';

interface Request {
  // Request needed structure
  language: string;
  text: string;
}

interface response {
  // Response structure
  software: {
    name: string;
    version: string;
    buildDate: string;
    apiVersion: number;
    status: string;
    premium: true;
  };
  language: {
    name: string;
    code: string;
    detectedLanguage: {
      name: string;
      code: string;
    };
  };
  matches: [
    {
      message: string;
      shortMessage: string;
      offset: number;
      length: number;
      replacements: [
        {
          value: string;
        },
      ];
      context: {
        text: string;
        offset: number;
        length: number;
      };
      sentence: string;
      rule: {
        id: string;
        subId: string;
        description: string;
        urls: [
          {
            value: string;
          },
        ];
        issueType: string;
        category: {
          id: string;
          name: string;
        };
      };
    },
  ];
}

const language: String = 'en-US';

const requestLangTool = async (r: Request) => {
  const url = `http://${process.env.grammerToolDNS}/v2/check`;

  const body = `text=${r.text}&language=${r.language}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error(
        `Unable to Fetch Data // Response Code: ` + response.status,
      );
    }
    var data: any = await response.json();
    return data;
  } catch (error) {
    console.error('Some Error Occured:', error);
  }
};

export async function main() {
  const myRequest = {
    language: language,
    text: 'This is an test.',
  } as Request;

  const result: response = await requestLangTool(myRequest);
  console.log("🚀 ~ main ~ result:", result.matches)

  return {
    statusCode: 200,
    body: JSON.stringify(result.matches),
  };
}
