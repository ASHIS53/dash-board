export default function Placeholder() {
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/Admin/GetRegisteredPatientDetail", {
        params: form,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
    fetchData();
  };
  return (
    <div className="text-2xl font-semibold text-gray-700">
      Page - Coming Soon!
    </div>
  );
}
