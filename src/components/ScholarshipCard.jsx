export default function ScholarshipCard({ scholarship }) {
    return (
        <div className="border p-4 rounded shadow mb-4">
            <h2 className="text-xl font-bold">{scholarship.title}</h2>
            <p>Provider: {scholarship.provider}</p>
            <p>Program Type: {scholarship.programType}</p>
            <p>Score: {scholarship.score}</p>
            <a href={scholarship.applyUrl} target="_blank" className="text-blue-500">
                Apply Here
            </a>
        </div>
    );
}
