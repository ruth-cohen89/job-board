import { useJobs } from '../graphql/hooks';
import JobList from './JobList';

function JobBoard() {
  const { jobs, loading, error } = useJobs();

  console.log({ jobs, loading, error })
  if (loading) {
    return <p>Loading...</p>
  }
  if(error) {
    return <p>Sorry, something went wrong.</p>
  }
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
