import React from "react";
// import JSONSchemaForm from "react-jsonschema-form";
import { getSubnetAPIs } from "../../services/apiService";

const currentApi = getSubnetAPIs()[9];
console.log("HERE", currentApi, getSubnetAPIs());
const apiSchema = currentApi.schema;
export default function APIForm({ onSubmit, apiSchema }) {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          {/* <JSONSchemaForm
            onSubmit={onSubmit}
            schema={apiSchema.schema}
            formData={apiSchema.formData}
            uiSchema={apiSchema.uiSchema}
          /> */}
        </div>
      </div>
    </div>
  );
}
