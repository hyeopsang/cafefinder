export default function Photo () {
    return (
        <div className="p-4">
          <h1 className="text-lg font-semibold mb-2">전체 사진</h1>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`photo-${idx}`}
                className="w-full h-32 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      ); 
}
