import React from "react";

const StashCard = ({ title, value, extra }) => {
    return (
        <>
            <div className="bg-white shadow-md rounded-lg m-2 w-full sm:w-1/2 md:w-1/3 flex-1 p-3">
                <h3 className="text-gray-500 font-semibold text-sm mb-6">{title}</h3>
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-gray-500 text-sm">{extra}</p>
            </div>
        </>
    );
}

// Card Header
const CardHeader = ({ children }) => (
    <div className="bg-gray-100 rounded-t-lg p-4">{children}</div>
);

// Card Title
const CardTitle = ({ children }) => (
    <h3 className="font-bold text-lg ">{children}</h3>
);

// Card Content
const CardContent = ({ children }) => (
    <div className="p-4">{children}</div>
);

// Card Item
const CardItem = ({ children }) => (
    <div className="flex justify-between items-center mb-2">{children}</div>
);

// Card Component
const Card = ({ header, title, data, renderItem }) => {
    return (
        <div className="bg-white shadow-md rounded-lg w-full sm:w-1/2 md:w-1/3 flex-1 m-2">
            {header && <CardHeader>{header}</CardHeader>}
            <CardContent>
                <div className="flex justify-between p-2 justify-items-center mb-4">

                    {title && <CardTitle>{title}</CardTitle>}
                    <span className="text-gray-500 font-semibold text-sm mt-1">View All</span>
                </div>
                {data && data.map((item, index) => (
                    <CardItem key={index}>{renderItem(item)}</CardItem>
                ))}
            </CardContent>
        </div>
    );
};

export default Card;
export { CardHeader, CardTitle, CardContent, CardItem, StashCard };
