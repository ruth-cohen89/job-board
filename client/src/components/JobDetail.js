import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useJob } from '../graphql/hooks';


function JobDetail() {
  const { jobId } = useParams();
  const { job, loading, error } = useJob(jobId);

  console.log({ job, loading, error })
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Sorry, something went wrong.</p>
  }
  // const [job, setJob] = useState(null)
  // useEffect(() => {
  //   getJob(jobId).then(setJob)
  // }, [jobId])

  // if(!job) {
  //   return <p>Loading...</p>;
  // }
  return (
    <div>
      <h1 className="title">
        {job.title}
      </h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>
          {job.company.name}
        </Link>
      </h2>
      <div className="box">
        {job.description}
      </div>
    </div>
  );
}

export default JobDetail;
