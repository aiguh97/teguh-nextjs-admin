import React from 'react';

const DashboardCard = ({ title, value, change, valueType, color }) => {
    return (
        <div className="flex flex-col card">
            <p className='text-text text-sm flex gap-2 items-center justify-between'>
                {title}
                {change && (
                    <span className={`${color == 'red' ? 'text-red-500' : 'text-green-500'} bg-background border border-stroke rounded-md px-2 py-[2px] text-xs`}>
                        +{change}
                    </span>
                )}
            </p>
            <h1 className='text-primary text-3xl font-semibold'>{valueType === 'percent' ? `${value.toFixed(0)} %` : value}</h1>
        </div>
    );
};

export default DashboardCard;
