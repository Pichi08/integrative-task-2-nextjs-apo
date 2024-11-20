import axios, {AxiosInstance}  from 'axios';

export class SendMessageService {
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

    public async sendMessage(question: string) {
    
        try {
            const response = await this.axios.post('/users/requests/', {
                question
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