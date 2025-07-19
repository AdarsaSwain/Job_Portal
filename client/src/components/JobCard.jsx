import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const JobCard = ({ job }) => {
  const navigate = useNavigate()
  const { backendUrl, userToken, currentUser } = useContext(AppContext)

  const handleApply = async () => {
    try {
      // ✅ old flow: save application to backend
      await axios.post(
        backendUrl + '/api/applications/apply',
        {
          jobId: job._id,
          userId: currentUser?._id // adjust if backend takes user from token
        },
        { headers: { token: userToken } }
      )

      toast.success('Application submitted!')

      // ✅ new flow: redirect to external jobLink if recruiter added one
      if (job.jobLink && job.jobLink.trim() !== '') {
        // make sure link starts with http/https
        const validLink = job.jobLink.startsWith('http')
          ? job.jobLink
          : `https://${job.jobLink}`;
        window.open(validLink, '_blank') // open in new tab
      } else {
        // fallback: go to internal apply page
        navigate(`/apply-job/${job._id}`)
        scrollTo(0, 0)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to apply.')
    }
  }

  return (
    <div className="border p-6 shadow rounded">
      <div className="flex justify-between items-center">
        {job.companyId?.image && (
          <img className="h-8" src={job.companyId.image} alt="" />
        )}
      </div>

      <h4 className="font-medium text-xl mt-2">{job.title}</h4>

      <div className="flex items-center gap-3 mt-2 text-xs">
        <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
          {job.location}
        </span>
        <span className="bg-red-50 border border-red-200 px-4 py-1.5 rounded">
          {job.level}
        </span>
      </div>

      <p
        className="text-gray-500 text-sm mt-4"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      <div className="mt-4 flex gap-4 text-sm">
        {/* ✅ Apply now uses our new handler */}
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply now
        </button>

        {/* Learn more still uses internal navigation */}
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`)
            scrollTo(0, 0)
          }}
          className="text-gray-500 border border-gray-500 rounded px-4 py-2"
        >
          Learn more
        </button>
      </div>
    </div>
  )
}

export default JobCard
