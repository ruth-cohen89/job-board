import { useParams } from 'react-router';
import { getCompany } from '../graphql/queries'
import { useEffect, useState } from 'react';
import  JobList  from './JobList'
import { useCompany } from '../graphql/hooks';

function CompanyDetail() {
  const { companyId } = useParams();
  const { company, loading, error } = useCompany(companyId);

  console.log({ company, loading, error })
  if (loading) {
    return <p>Loading...</p>
  }
  if(error) {
    return <p>Sorry, something went wrong.</p>
  }

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h5 className='title is-5'> 
        Jobs at {company.name}:
        <JobList jobs={company.jobs} />
      </h5>
    </div>


  );
}

export default CompanyDetail;
