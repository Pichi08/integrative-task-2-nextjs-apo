import axios, {AxiosInstance}  from 'axios';

export class ChatHistoryService {
    protected readonly axios: AxiosInstance;

    constructor(url: string) {
        this.axios= axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 6000, 
            timeoutErrorMessage: 'Request Timeout'
        });
    }

    public async getAllHistory(token: string) {

        // console.log("Enviando mensaje ", question);
    
        try {
            const response = await this.axios.get('/user/requests/', 
            { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Extract and log the specific response text if available
                // console.log(error.response?.data?.message || "An error occurred");
                return error.response?.data?.message || "An error occurred";
            } else {
                // Handle non-Axios errors
                // console.log("An unexpected error occurred");
                return "An unexpected error occurred";
            }
        }
        
    }


}