import * as motion from "framer-motion/client"

import { LandingHeader } from "@/components/landing-page/header";
import { LandingHero } from "@/components/landing-page/hero";
import Link from "next/link";
import {FaQuestion, FaRegBuilding} from "react-icons/fa";
import {IoIosCheckmarkCircle} from "react-icons/io";
import {TbBuildingCarousel} from "react-icons/tb";
import {MdOutlineBiotech} from "react-icons/md";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {AnimateText} from "@/components/animate-text";
import {LuArrowRightLeft} from "react-icons/lu";

export default function Home() {
  return (
      <div className="min-h-screen p-5 max-w-screen-2xl mx-auto">
        <header className="flex flex-col p-5 bg-white rounded-xl">
          <LandingHeader />
          <LandingHero />
        </header>

          <main className="space-y-3">
            <div className="flex mt-3 md:space-x-3">
                <div className="bg-white w-1/2 p-5 rounded-3xl hidden md:flex items-center justify-center">
                    <motion.span
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                            duration: 0.1,
                            delay: 0,
                        }}
                    >
                        <Image src="/company.png" alt="test" width={500} height={500} className="mx-auto"/>
                    </motion.span>
                </div>
                <div className="flex w-full md:w-1/2 flex-col space-y-3">
                    <div className="bg-white p-5 rounded-2xl space-y-3">
                        <div className="flex items-center justify-center md:justify-start space-x-5">
                            <motion.span
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{
                                    duration: 0.8,
                                    delay: 0,
                                }}
                            >
                                <FaRegBuilding size={36} color="#991b1b"/>
                            </motion.span>
                                <h3 className="text-2xl uppercase w-full md:w-1/3 text-wrap font-medium">
                                    <AnimateText>
                                        Korzyści dla Korporacji
                                    </AnimateText>
                                </h3>
                        </div>
                        <p>
                            <AnimateText>
                                Nasza platforma pomaga korporacjom realizować cele społeczne zgodnie z nadchodzącymi
                                regulacjami i oczekiwaniami społecznymi, zwiększając zaufanie i lojalność klientów.
                            </AnimateText>
                        </p>
                            <p className="text-right font-semibold text-lg uppercase text-red-700">
                                <AnimateText>
                                Zaangażowanie Społeczne i Wiarygodność
                                </AnimateText>
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl space-y-3">
                            <div className="flex items-center space-x-5">
                                <motion.span
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0,
                                    }}
                                >
                                    <TbBuildingCarousel size={36} color="#991b1b"/>
                                </motion.span>
                                    <h3 className="text-2xl uppercase w-full md:w-1/3 text-wrap font-medium">
                                        <AnimateText>
                                            Korzyści dla NGO
                                        </AnimateText>
                                    </h3>
                            </div>
                            <p>
                                <AnimateText>
                                    NGO zyskują dostęp do kluczowych zasobów finansowych i ludzkich, które umożliwiają
                                    realizację ich misji.
                                </AnimateText>
                            </p>
                            <p className="text-right font-semibold text-lg uppercase text-red-700">
                                <AnimateText>
                                Dostęp do Zasobów
                                </AnimateText>
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl space-y-3">
                            <div className="flex items-center space-x-5">
                                <motion.span
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0,
                                    }}
                                >
                                    <MdOutlineBiotech size={42} color="#991b1b"/>
                                </motion.span>
                                <h3 className="text-2xl uppercase w-full md:w-1/3 text-wrap font-medium">
                                    <AnimateText>
                                        Innowacyjne technologie
                                    </AnimateText>
                                </h3>
                            </div>
                            <p>
                                <AnimateText>
                                    Wykorzystujemy zaawansowane algorytmy AI do analizy danych i dopasowania partnerów,
                                    gwarantując bezpieczeństwo i efektywność współpracy.
                                </AnimateText>
                            </p>
                            <p className="text-right font-semibold text-lg uppercase text-red-700">
                                <AnimateText>
                                AI i Bezpieczeństwo
                                </AnimateText>
                            </p>
                        </div>
                    </div>
                </div>

              <div className="w-full space-y-5 bg-white rounded-2xl p-5">
                  <motion.span
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{
                          duration: 0.1,
                          delay: .1,
                      }}
                  >
                      <div className="flex w-full justify-center items-center space-x-3">
                          <LuArrowRightLeft size={36} color="#991b1b"/>
                          <div className="text-center text-2xl uppercase font-semibold tracking-wider rounded-2xl">
                              <p>nasze</p>
                              <p>usługi</p>
                          </div>
                      </div>
                  </motion.span>
                      <div className="flex items-center space-x-5">
                          <div>
                              <motion.span
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  transition={{
                                      duration: 0.8,
                                      delay: 0,
                                  }}
                              >
                                  <IoIosCheckmarkCircle size={36} color="#991b1b"/>
                              </motion.span>
                          </div>
                          <div className="space-y-2">
                              <h3 className="text-xl font-medium uppercase">
                                  <AnimateText>
                                      Rekomendacje i Matching
                                  </AnimateText>
                              </h3>
                              <p>
                              <AnimateText>
                                  Nasza zaawansowana platforma rekomendacyjna zapewnia najlepsze dopasowania między
                                  korporacjami
                                  a organizacjami non-profit.
                                  </AnimateText>
                              </p>
                          </div>
                      </div>

                      <div className="flex items-center space-x-5">
                          <div>
                              <motion.span
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  transition={{
                                      duration: 0.8,
                                      delay: 0,
                                  }}
                              >
                                  <IoIosCheckmarkCircle size={36} color="#991b1b"/>
                              </motion.span>
                          </div>
                          <div className="space-y-2">
                              <h3 className="text-xl font-medium uppercase">
                                  <AnimateText>
                                      Algorytmy AI
                                  </AnimateText>
                              </h3>
                              <p>
                              <AnimateText>
                                  Auto-generowanie treści, analiza danych, oraz tagowanie – wszystko po to, aby
                                  usprawnić i ułatwić procesy decyzyjne.
                                  </AnimateText>
                              </p>
                          </div>
                      </div>

                      <div className="flex items-center space-x-5">
                          <div>
                              <motion.span
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  transition={{
                                      duration: 0.8,
                                      delay: 0,
                                  }}
                              >
                                  <IoIosCheckmarkCircle size={36} color="#991b1b"/>
                              </motion.span>
                          </div>
                          <div className="space-y-2">
                              <h3 className="text-xl font-medium uppercase">
                                  <AnimateText>
                                      Platforma dla Freelancerów
                                  </AnimateText>
                              </h3>
                              <p>
                                  <AnimateText>
                                  Tworzymy nowy rynek pracy dla freelancerów specjalizujących się w mediacji i
                                  wspieraniu komunikacji między firmami a NGO.
                                  </AnimateText>
                              </p>
                          </div>
                      </div>
              </div>

              <div className="w-full space-y-5 bg-white text-center rounded-2xl p-5">
                  <motion.span
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{
                          duration: 0.8,
                          delay: 0,
                      }}
                  >
                      <div className="flex w-full justify-center items-center space-x-3">
                          <h3 className="uppercase text-2xl font-semibold">
                              <p>dlaczego</p>
                              <p>trustlink</p>
                          </h3>
                          <FaQuestion size={36} color="#991b1b"/>
                      </div>
                  </motion.span>
                  <p className="text-xl">
                      <AnimateText>
                          Nasze podejście to połączenie nowoczesności z praktycznym zastosowaniem, co
                          pozwala na efektywne i funkcjonalne rozwiązania problemów społecznych i korporacyjnych.
                      </AnimateText>
                  </p>
                  <motion.span
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{
                          duration: 0.8,
                          delay: 0,
                      }}
                  >
                      <Link href={"/application"}>
                          <Button
                              className="text-xl tracking-widest uppercase mt-5 p-6 bg-red-700 rounded-xl font-light text-white hover:bg-red-800"
                          >
                              Pomagaj zmienić świat
                          </Button>
                      </Link>
                  </motion.span>
              </div>
          </main>
      </div>
)
}
