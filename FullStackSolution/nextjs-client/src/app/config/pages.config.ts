
// pages.config.ts
// Configuration for application pages

//export const PAGES = {
//    PROFILE: (username: string) =>'/u/${username}'
//}

class PageConfig {

    HOME = '/';
    ML = '/ml';
    LLM = '/llm';
    TEST = '/test';
    SHOP = '/shop';
    SSG = '/shop/ssg';
    ISR = '/shop/isr';
    PROFILE(username: string): string {
        return `/u/${username}`;

    };
    WEBAPI = '/webapi';
    REACT19 = '/react19';
    REACT19HOME = '/react19/home';
    USEACTIONSPAGE = '/react19/useactionspage';
    USEFORMSTATUS = '/react19/useformstatus';
    USEHOOK = '/react19/usehook';

    PRODUCTSTABLE = '/webapi';
    PRODUCTSDRAWER = '/webapi/products-table-drawer'

    SENTIMENTANALYZIER = '/ml/sentiment-analyzer'; 
    LEARNINGASSISTANT = '/ml/learning-assistant';
    HOUSINGCHATBOT = '/ml/housing-chatbot';

    PROFILEFAKEMENUE = '/LlmMenu';
    LEARNING = '/llm/learning';
    STYLETRANSFORMER = '/llm/style-transformer'; 
    SQLTRANSLATOR = '/llm/chat-assistant';
}
export const PAGES = new PageConfig();