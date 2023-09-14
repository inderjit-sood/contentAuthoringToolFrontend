import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SchemaSelector = ({ onSelectSchema }) => {
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');

  const fetchData = () => {
    fetch('/get-all-schemas')
      .then((response) => response.json())
      .then((data) => {
        setSchemas(data);
      })
      .catch((error) => {
        console.error('Error fetching schemas:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSchemaChange = (event) => {
    const selectedSchemaId = event.target.value;
    const selectedSchemaValue = schemas.find((schema) => schema.schemaId === selectedSchemaId);
  
    if (selectedSchemaValue) {
      setSelectedSchema(selectedSchemaValue.schemaString);
    } else {
      setSelectedSchema(''); // Clear the selected schema if not found
    }
  };
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedSchema) {
        console.log(`Selected the schema ${selectedSchema} and the type is ${typeof selectedSchema}`);
        onSelectSchema(selectedSchema);
    }
  };

  return (
<div className="container">
      <h2>Select a Schema</h2>
      <form className="form-horizontal" onSubmit={handleFormSubmit}>
        <div className="form-group col-md-6">
            <select className="form-control" onChange={handleSchemaChange}>
              <option value="">Select a schema</option>
              {schemas.map((schema) => (
                <option key={schema.schemaId} value={schema.schemaId}>
                  {schema.schemaTitle}
                </option>
              ))}
            </select>
        </div>
        <div className="form-group">
          <div className="col-md-offset-2 col-md-10">
            <button type="submit" className="btn btn-primary">Load Schema</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SchemaSelector;
