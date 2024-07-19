
import { GoogleAuth } from 'google-auth-library';
import { Readable } from 'stream';


// Service account information
const serviceAccount = {
  type: "service_account",
  project_id: "reactchat-1a08c",
  private_key_id: "aaabac94d853dcc3405bb9b5c86bd68b57a28012",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDIFUqrrEAHs84E\nqFD6J/05546/2dtHcMr1kBYGN4tQzNJboRc3aXjLvenmIw3IjCh4C2lIIKQftQuk\niF80uTsDB8w4pi6+KHbwQJG0PVVQ2w/IVGbQa4hGNpmHbDH1IWxrVjLH5Aj6iIvt\nCG/1vD7n/RoInEOotd540NwKUueWoXdFSfv3EP/8k3W6WbDr0DQG+VwRUEx2AvfN\nJkVA9ZTvC0CTafwpGViKj+sle3bMhQDVxOSshP7LfSlu8Y2w+vA8HOBzPvskUs5c\nLp9ycRk2QqjK6HdV/8ZY6ubfpAYYCGjPBZ9I/B/Q7F8Zrau7Tc+TDyOBdyXHoP7L\nhQbZKlI5AgMBAAECggEAJsY9iMRiSjvVnoBx5PCv+bM+rj5NaOxaYLlSE1VbScbP\ns1MmGSZ28uD0fZVoe+dxhkYL2p78v2pJ/dIxxRlqbr1pncbSwyY7Wnbg5bGHIZq6\nVcPJgvV73MODAEP+8HbQOILlZ2hxNwAUQdTDQbd/51xc2bNSx1SrbvVm1xdW6xE6\nvptYtdh6JQEd8e8bnY8xWzIqtnGXVk4DWkdqgchSgCtygpdaxjWc9qs6ROi5GWml\nWE8iIfoHdXrnJ1svaAmbaFW/FPnnWFWbA7gKGJbPSaYBGBa8MYUX1/ovqNiiF0Ox\n2sFrSMnAjEkj9HkdQRyVCDdoEurBhx306MSaDr4B4wKBgQDlFFVCU1qeOrG1M7UZ\n4exGl+YsZj7NdspflDkfW/nWL7OjTQYwLazGi16liHmvU9BrjAAvFsk/DjzTIh0L\nBWm3Cwi1ENXN5fqetH3JGR4BwVl43vAtvdWFHPung1FhDOTf/Bm8Umm0uHeoW8WB\nCSPqylbHmQ2vYCJ1kovYGq1ZOwKBgQDfmKFKTNfpp3N++bI8LdLQ70A31FfWVoXP\nzG11sNdqw8cbgWQkZeyaImwpMx/Ag8Q4NJq0Nkc0TiFahIlPhKJl4+0MCUnRCC84\ngeLE5pWkM5t/mWlZyP+6Gi58gVrW9BqiBVFVmaOI4FNo/sUMm4fui0DqKs+/rSf2\naCPJil8rGwKBgBAxvMlAjUJsUc3GhwH6Z7Kh4GK5I61wvWO+Xb9qyCGtI5ziwBI9\n2F380kcPe9K6MRy5O/YYPUfY4NHoMndp/Yw0Gnx6YTL6FBqOFepWfTmQipux3vbM\n2cBcSSoRbXpX6AIxlzwp81EUTVk4i6DQnZpmjXX0yvPf7u+y2XIAiMqrAoGADdFO\n1lqdVTEl8AjaPOHQD11ZqJmUvAgoyMinUwiUp2Jl4YtDdwRddMD/0iP4qFr8O0T0\n8oIQMGlLol5iZemaZ5WIRqAkUaih0moka2qcgMM3rtD6M7Q6KXQIv2T3CiWXp7+Q\nYSvXcVP7k5d68eaCpfkxD8eJgxzeRVn2LDRC4VUCgYAWjOkPIaf3V3rN09MJeUWt\nhpY96omIOlro/jWFdlwMav43cBJ3QnryeTkSz4oYDXzsvGQr94+jXCCC5zMcCjKS\nYzYS7lMntwUcKfv8Kx8/9kBna5A+7ayh0ZAEcurIDLXDBliIlXSU9eRjzTxqMoCx\nz4ZgAgwbrIfoJiMd9ltZaQ==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-5ev7p@reactchat-1a08c.iam.gserviceaccount.com",
  client_id: "105057482229424007095",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5ev7p@reactchat-1a08c.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

const firebaseMessagingScope = "https://www.googleapis.com/auth/firebase.messaging";

async function getAccessToken() {
  try {
    // Convert service account to a JSON string and create a stream from it
    const serviceAccountJson = JSON.stringify(serviceAccount);
    const serviceAccountStream = Readable.from(serviceAccountJson);
    
    // Initialize GoogleAuth with the service account credentials
    const auth = new GoogleAuth({
      credentials: JSON.parse(serviceAccountJson),
      scopes: [firebaseMessagingScope]
    });

    const client = await auth.getClient();
    const accessTokenResponse = await client.getAccessToken();
    return accessTokenResponse.token;
  } catch (error) {
    console.error('Error obtaining access token:', error);
    return null;
  }
}

// Example usage:
getAccessToken().then(token => {
  if (token) {
    console.log('Access Token:', token);
  } else {
    console.log('Failed to obtain access token.');
  }
});
