import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { backendUrl, userToken, currentUser } = useContext(AppContext);

  const handleApply = async () => {
    try {
      await axios.post(
        backendUrl + '/api/users/apply',
        { jobId: job._id },
        { headers: { token: userToken } }
      );
      toast.success('Application submitted!');
      if (job.jobLink && job.jobLink.trim() !== '') {
        const validLink = job.jobLink.startsWith('http')
          ? job.jobLink
          : `https://${job.jobLink}`;
        window.open(validLink, '_blank');
      } else {
        navigate(`/apply-job/${job._id}`);
        scrollTo(0, 0);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to apply.');
    }
  };

  return (
    <div className="border p-6 shadow rounded bg-white">
      <div className="flex justify-between items-center">
        {job.companyId?.image && (
          <img className="h-8" src={job.companyId.image} alt="" />
        )}
      </div>

      <h4 className="font-medium text-xl mt-2">{job.title}</h4>

      {/* badges */}
      <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
        <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
          {job.location}
        </span>
        <span className="bg-red-50 border border-red-200 px-4 py-1.5 rounded">
          {job.level}
        </span>
        {/* ✅ NEW Experience Badge */}
        {job.experience && (
          <span className="bg-green-50 border border-green-200 px-4 py-1.5 rounded">
            {job.experience}
          </span>
        )}
      </div>

      <p
        className="text-gray-500 text-sm mt-4"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      <div className="mt-4 flex gap-4 text-sm">
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="text-gray-500 border border-gray-500 rounded px-4 py-2"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
