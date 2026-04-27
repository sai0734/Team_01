export default function useScrollToTop() {
  const useScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  return useScroll;
}
