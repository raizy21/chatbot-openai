// import marked-react and react-refractor
// for styling to apply, you will need to copy the contents of index.css
import Markdown from 'marked-react';
import { Refractor, registerLanguage } from 'react-refractor';

// import languages you want to support highlighting for
import bash from 'refractor/lang/bash';
import js from 'refractor/lang/javascript.js';
import php from 'refractor/lang/php.js';
import python from 'refractor/lang/python.js';

//register each language
registerLanguage(bash);
registerLanguage(js);
registerLanguage(php);
registerLanguage(python);

const renderer = {
    code(snippet, lang) {
        // if no lang given, default to bash
        if (!lang) lang = 'bash';
        const allowedLangs = ['js', 'php', 'python'];
        // if language isn't one of the allowed, default to bash
        if (!allowedLangs.includes(lang)) lang = 'bash';
        // return Refractor component, and pass the lang and snippet
        return (
            <Refractor key={this.elementId} language={lang} value={snippet} />
        );
    },
};

const ChatBubble = ({ role, content }) => {
    return (
        <div
            className={`chat ${
                role === 'assistant' ? 'chat-start' : 'chat-end'
            }`}
        >
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full p-2 bg-slate-700'>
                    {role === 'assistant' ? 'Bot' : 'You'}
                </div>
            </div>

            <div
                className={`chat-bubble ${
                    role === 'assistant'
                        ? 'chat-bubble-secondary'
                        : 'chat-bubble-primary'
                }`}
            >
                <Markdown gfm renderer={renderer}>
                    {content}
                </Markdown>
            </div>
        </div>
    );
};

export default ChatBubble;
