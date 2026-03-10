import ServiceSection from "@/components/service-section";
import { ArtGallerySlider } from "@/components/art-gallery-slider";
// import ClipsPage from "@/components/price-voucher-folder";
// import { GenerationProvider } from "@/components/contexts/generation-context";
import ServiceStandard from "@/components/service-standard";
import FloatingAppMenu from "@/components/floating-app-menu";
import ComboLove from "@/components/ui/combo-love";
import ComboIndepth from "@/components/ui/combo-indepth";
import FloatingCart from "@/components/ui/floating-cart";
import VoucherSection from "@/components/voucher-section";
export default function HomePage() {
  return (
    <>
      <ServiceSection />
      <ComboIndepth />
      <ComboLove />
      <div id="art-gallery-slider" className="h-screen w-screen overflow-hidden bg-black">
        <ArtGallerySlider />
      </div>
      <VoucherSection />

      {/* <div className="h-fit w-screen overflow-hidden bg-black">
        <GenerationProvider>
          <ClipsPage />
        </GenerationProvider>
      </div> */}
      <div className=" w-screen overflow-hidden bg-black">
        <ServiceStandard />
      </div>
      {/* <FloatingCart /> */}
      {/* <FloatingAppMenu /> */}
    </>
  );
}
