import AuthProtected from "@/components/AuthProtected/AuthProtected";
import CartDetail from "@/components/CartDetail/CartDetail";

const Page = () => {
  return (
    <AuthProtected>
      <CartDetail />
    </AuthProtected>
  );
};
export default Page;
