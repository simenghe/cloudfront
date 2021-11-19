import React from 'react'
function Message({ username, title, content }) {
    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 m-4">
            <div className="flex-shrink-0">
            </div>
            <div>
                <div className="text-xl font-bold text-black">{title}</div>
                <div className="text-l font-medium text-black  justify-center">{content}</div>
                <p className="text-gray-500">{`Written by: ${username}`}</p>
            </div>
        </div>
    )
}

export default Message