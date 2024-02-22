import { CircularProgress, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";

interface Props {
  loading: boolean;
}

const SpinnerWithCounter = ({ loading }: Props) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setProgress(0);
    }
  }, [loading]);

  return (
    <>
      {loading && (
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            thickness={1}
            value={progress}
            size={200}
          />
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {`${progress}%`}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SpinnerWithCounter;
