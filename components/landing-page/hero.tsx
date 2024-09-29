import { LandingCounter } from "@/components/landing-page/counter";
import * as motion from "framer-motion/client"

export const LandingHero = () => {
  return (
      <div className="flex flex-col lg:flex-row">
          <motion.span
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{
                  duration: 0.1,
                  delay: 0,
              }}
          >
              <video autoPlay muted loop style={{width: '500px', height: '500px'}} className="xl:ml-32 lg:ml-16">
                  <source src="/logo-animation.mp4"/>
              </video>
          </motion.span>
              <div className="flex flex-col w-full mt-10 px-5">
                  <div className="justify-end w-full space-x-8 hidden md:flex">
                      <motion.span
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{
                              duration: 0.8,
                              delay: .5,
                          }}
                      >
                          <LandingCounter count={100} title={"instytucji w systemie"}/>
                      </motion.span>
                      <motion.span
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{
                              duration: 0.8,
                              delay: 1.3,
                          }}
                      >
                          <LandingCounter count={100} title={"których przekazało pomoc"}/>
                      </motion.span>
                      <motion.span
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{
                              duration: 0.8,
                              delay: 2.1,
                          }}
                      >
                          <LandingCounter count={100} title={"których otrzymało pomoc"}/>
                      </motion.span>
                  </div>
                  <div className="flex justify-end -mt-12 md:mt-24 mb-12 pr-12">
                      <div className="flex flex-col space-y-1">
                          <h1 className="uppercase text-4xl md:text-5xl self-end text-red-700 font-bold tracking-widest">
                              <motion.span
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  transition={{
                                      duration: 0.1,
                                      delay: .1,
                                  }}
                              >trustlink
                              </motion.span>
                          </h1>
                          <h2 className="uppercase text-4xl md:text-6xl text-right text-wrap font-medium">
                              <motion.span
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  transition={{
                                      duration: 0.1,
                                      delay: 1,
                                  }}
                              >silna współpraca
                              </motion.span>
                          </h2>
                          <h2 className="uppercase text-3xl md:text-5xl text-right text-wrap font-bold text-red-700">
                              <motion.span
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  transition={{
                                      duration: 0.25,
                                      delay: 1.25,
                                  }}
                              >może
                              </motion.span>
                          </h2>
                          <h2 className="uppercase text-3xl md:text-6xl text-right text-wrap font-medium">
                              <motion.span
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  transition={{
                                      duration: 0.25,
                                      delay: 1.5,
                                  }}
                              >zmienić świat
                              </motion.span>
                          </h2>
                      </div>
                  </div>
              </div>
      </div>
)
};
