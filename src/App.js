import React, { useState } from 'react';
import './App.css';
import SchemaSelector from './Components/SchemaSelector';
import CustomForm from './Components/CustomForm';

function App() {
  const [selectedSchema, setSelectedSchema] = useState(null);

  const handleSchemaSelect = (schemaJson) => {
    setSelectedSchema(schemaJson);
  };

  return (
<div className="container">
      <div className="row">
        <div className="col-md-12">
          <SchemaSelector onSelectSchema={handleSchemaSelect} />
        </div>
        <div className="col-md-12">
          {selectedSchema && (
            <CustomForm
              schema={selectedSchema}
              onFormSubmit={(data) => console.log('Form data submitted:', data)}
              onFormError={(error) => console.error('Form error:', error)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
