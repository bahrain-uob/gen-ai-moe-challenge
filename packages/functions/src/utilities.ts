import fetch from 'node-fetch';

export const runLangTool = async (text: string) => {
  const url = `http://${process.env.grammerToolDNS}/v2/check`;

  const language: String = 'en-US';
  const body = `text=${text}&language=${language}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error(
        `Unable to Fetch Data // Response Code: ` + response.status,
      );
    }
    let data = JSON.parse(await response.text());
    return data.matches;
  } catch (error) {
    console.error('Some Error Occured:', error);
  }
};
