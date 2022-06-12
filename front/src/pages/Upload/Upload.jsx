import React from 'react';

export default function Upload() {
    return (
        <form encType="multipart/form-data" action={`${BACKEND_HOST}/upload_files`} method="POST">
            <label htmlFor="file-upload">Select file:</label>
            <input id="file-upload" type="file" name="file"/>
            <input type="submit" value="POST to server"></input>
        </form>    
    )
}