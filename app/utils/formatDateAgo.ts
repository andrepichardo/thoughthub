export const formatDateAgo = (createdAt: string): string => {
  const now = new Date();
  const commentDate = new Date(createdAt);
  const timeDifference = Math.floor(
    (now.getTime() - commentDate.getTime()) / 1000
  );

  if (timeDifference < 60) {
    return `${timeDifference} second${timeDifference !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < 3600) {
    const minutesAgo = Math.floor(timeDifference / 60);
    return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < 86400) {
    const hoursAgo = Math.floor(timeDifference / 3600);
    return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
  } else {
    const daysAgo = Math.floor(timeDifference / 86400);
    return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
  }
};
