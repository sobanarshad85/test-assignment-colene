import TextField from '@mui/material/TextField';

export default function Home() {
  return (
    <div className="h-screen w-screen  flex justify-center items-center">
      <p className="text-white">lsdkfjlk</p>
      <TextField
        required
        id="outlined-required"
        label="Email"
        defaultValue=""
        placeholder="Email"
      />
      <TextField
        required
        id="outlined-required"
        label="Password"
        defaultValue=""
        placeholder="Password"
      />
    </div>

  );
}
