import AddPost from './components/AddPost';
import DataQuery from './components/DataQuery';

function Home() {
  return (
    <main className="w-full h-full flex flex-col min-h-screen">
      <AddPost />
      <div className="mt-4 mb-0 h-[2.2px] bg-gray-200" />
      <DataQuery />
    </main>
  );
}
export default Home;
