import Link from "next/link";
import Image from "next/image";
import {
  Crown,
  Scroll,
  Sparkles,
  ArrowRight,
  Home,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";

interface SuccessPageProps {
  params: { id: string };
}

export default function SuccessPage({ params }: SuccessPageProps) {
  const courseId = params.id;

  return (
    <div className="min-h-screen bg-castle-wall relative">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10">
        <Navbar />

        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Crown className="h-16 w-16 text-amber-400 animate-pulse" />
                  <Sparkles className="h-6 w-6 text-amber-300 absolute -top-2 -right-2 animate-bounce" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-amber-300 pixel-text mb-4">
                Congratulations, Noble Scholar!
              </h1>
              <p className="text-xl text-stone-200 max-w-2xl mx-auto">
                You have successfully joined the ranks of knowledge seekers.
                Your quest for wisdom begins now!
              </p>
            </div>

            {/* Main Content Card */}
            <div className="max-w-4xl mx-auto">
              <Card className="bg-stone-800/90 border-2 border-amber-600 shadow-2xl backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-amber-900/20 to-stone-900/40">
                      <div className="text-center">
                        <div className="image-frame inline-block mb-6">
                          <Image
                            src="/images/knighting.png"
                            alt="Knowledge Ceremony - Master passing wisdom to student"
                            width={300}
                            height={300}
                            className="block"
                          />
                        </div>
                        <h3 className="text-2xl font-bold text-amber-300 pixel-text mb-2">
                          The Ceremony of Knowledge
                        </h3>
                        <p className="text-stone-300 text-sm">
                          As knights were once dubbed by their lords, so shall
                          wisdom be passed from master to student.
                        </p>
                      </div>
                    </div>

                    {/* Success Details Section */}
                    <div className="lg:w-1/2 p-8 text-white">
                      <div className="space-y-6">
                        <div className="flex items-center mb-6">
                          <Scroll className="h-8 w-8 text-amber-400 mr-3" />
                          <h2 className="text-3xl font-bold text-amber-300">
                            Your Quest Begins!
                          </h2>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 font-bold text-sm mr-4 mt-1">
                              ✓
                            </div>
                            <div>
                              <h4 className="font-semibold text-amber-200 mb-1">
                                Payment Confirmed
                              </h4>
                              <p className="text-stone-300 text-sm">
                                Your enrollment has been successfully processed
                                and confirmed.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 font-bold text-sm mr-4 mt-1">
                              ✓
                            </div>
                            <div>
                              <h4 className="font-semibold text-amber-200 mb-1">
                                Access Granted
                              </h4>
                              <p className="text-stone-300 text-sm">
                                You now have full access to all course materials
                                and resources.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 font-bold text-sm mr-4 mt-1">
                              ✓
                            </div>
                            <div>
                              <h4 className="font-semibold text-amber-200 mb-1">
                                Certificate Awaits
                              </h4>
                              <p className="text-stone-300 text-sm">
                                Complete your course to earn your certificate of
                                mastery.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-stone-700/50 rounded-lg p-4 border border-amber-600/30">
                          <h4 className="font-semibold text-amber-300 mb-2 flex items-center">
                            <Sparkles className="h-5 w-5 mr-2" />
                            What happens next?
                          </h4>
                          <ul className="text-stone-300 text-sm space-y-1">
                            <li>• Check your email for more details</li>
                            <li>• Begin your learning journey immediately</li>
                            <li>• Join our community of fellow scholars</li>
                            <li>
                              • Track your progress and develop your skills
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link href={`/courses/details/${courseId}`}>
                <Button className="btn-medieval px-8 py-6 text-lg group">
                  Begin Your Quest
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  variant="outline"
                  className="border-amber-500 bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-white font-semibold px-8 py-6 text-lg"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore More Courses
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-stone-600 text-stone-300 hover:bg-stone-700 px-8 py-6 text-lg bg-transparent"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Return to Castle
                </Button>
              </Link>
            </div>

            {/* Additional Information */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <Card className="bg-stone-800/80 border border-stone-700 text-center p-6">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">
                  Lifetime Access
                </h3>
                <p className="text-stone-300 text-sm">
                  Your course materials are yours forever. Learn at your own
                  pace, revisit anytime.
                </p>
              </Card>

              <Card className="bg-stone-800/80 border border-stone-700 text-center p-6">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">
                  Expert Instructors
                </h3>
                <p className="text-stone-300 text-sm">
                  Learn from masters of their craft who are dedicated to your
                  success.
                </p>
              </Card>

              <Card className="bg-stone-800/80 border border-stone-700 text-center p-6">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-amber-200 mb-2">
                  Community Support
                </h3>
                <p className="text-stone-300 text-sm">
                  Join thousands of fellow learners in our supportive community.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
