import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CustomForm = ({ schema, onFormSubmit, onFormError }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');




  const handleFormSubmit = ({ formData }, e) => {
    const schemaId = schema.schemaId;
    const articleId = uuidv4();
    const article = {
      articleId,
      articleJson: JSON.stringify(formData),
      schemaId,
    };

    console.log(`Sending article ${JSON.stringify(article)} to the server`);

    fetch('/publish-article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    })
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage('Your article was published');
          return response.json();
        } else {
          throw new Error(`Failed to create article. Status: ${response.status}`);
        }
      })
      .then((data) => {
        console.log('Article created:', data);
        onFormSubmit(formData);
      })
      .catch((error) => {
        console.error('Error creating article:', error);
        setErrorMessage('Your article failed to publish. Please try again after some time.');
        onFormError(error);
      });
  };

  const handleFormError = (e) => {
    onFormError(e);
  };

  return (
    <div className="col-md-6">
      <h2>Fill the form below:</h2>
      <Form
        schema={JSON.parse(schema.schemaString)} //quick-fix, need to move this to the outer component App
        validator={validator}
        onSubmit={handleFormSubmit}
        onError={handleFormError}
      />
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default CustomForm;
