import React, { FC } from 'react';

interface AlertProps {
    messageText: string;
    messageType?: string;
    closeClickHandler(): void;
}

export const Alert: FC<AlertProps> = ({messageText, messageType = 'warning', closeClickHandler}) =>
    <div
        className={`alert alert-${messageType} alert-dismissible`}
        role="alert">
        {messageText}
        <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeClickHandler}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

