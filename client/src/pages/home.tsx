import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { contactFormSchema, type ContactFormData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Heart, 
  Smile, 
  Palette, 
  Lightbulb, 
  Dumbbell, 
  Flame, 
  Users, 
  Zap,
  Activity,
  Target,
  Star,
  CheckCircle2,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Loader2,
  Home as HomeIcon,
  Info,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Menu,
  X
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import transformationImage from "@assets/generated_images/Transformation_before_after_results_1ed81a38.png";
import workoutVideo from "@assets/5319089-uhd_3840_2160_25fps_1762541494599.mp4";
import heroVideo from "@assets/4325592-uhd_4096_2160_25fps_1762544359197.mp4";
import onlineClassImage from "@assets/generated_images/Online_fitness_class_women_c03f2b22.png";
import trainer1Image from "@assets/stock_images/indian_female_fitnes_26f1d39f.jpg";
import trainer2Image from "@assets/generated_images/Zumba_instructor_dancing_portrait_1640c3fe.png";
import trainer3Image from "@assets/generated_images/Strength_trainer_portrait_with_dumbbells_a7c3e639.png";
import cardioImage from "@assets/generated_images/Woman_doing_cardio_workout_1ba27fe8.png";
import functionalImage from "@assets/generated_images/Functional_training_exercise_e1989ece.png";
import strengthImage from "@assets/generated_images/Strength_training_with_weights_f007c33a.png";
import mobilityImage from "@assets/generated_images/Mobility_and_flexibility_exercise_26512ec9.png";
import yogaImage from "@assets/generated_images/Yoga_meditation_pose_691f5267.png";
import zumbaImage from "@assets/generated_images/Zumba_dance_fitness_class_875f492b.png";
import gymLogo from "@assets/gym-logo.png";
import hocLogo from "@assets/hoc-logo.jpg";

const WHATSAPP_NUMBER = "918600126395";
const PHONE_NUMBER = "+91 8600126395";
const GOOGLE_REVIEWS_URL = "https://share.google/BOqrkzB7sb4X33Iy0";

export default function Home() {
  const { toast } = useToast();
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      purpose: undefined,
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response;
    },
    onSuccess: (data: any) => {
      toast({
        title: "Thank you!",
        description: data.message || "We'll contact you shortly to discuss your fitness journey.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20want%20to%20book%20a%20free%20consultation%20for%20your%20fitness%20program.`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0 overflow-x-hidden">
      {/* Navigation Header */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <img src={hocLogo} alt="HOC Fitness" className="h-16 md:h-20 w-auto" />
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-black/40 backdrop-blur-md border-l border-white/20">
              <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <X className="h-6 w-6 text-white" />
                <span className="sr-only">Close</span>
              </SheetClose>
              <nav className="flex flex-col gap-6 mt-8">
                <button 
                  onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-white hover:text-primary transition-colors text-left"
                >
                  HOME
                </button>
                <button 
                  onClick={() => { document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-white hover:text-primary transition-colors text-left"
                >
                  PROGRAM
                </button>
                <button 
                  onClick={() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-white hover:text-primary transition-colors text-left"
                >
                  PRICING
                </button>
                <button 
                  onClick={() => { document.getElementById('trainers')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-white hover:text-primary transition-colors text-left"
                >
                  TRAINERS
                </button>
                <button 
                  onClick={() => { document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-white hover:text-primary transition-colors text-left"
                >
                  BEFORE & AFTER
                </button>
                <button 
                  onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-white hover:text-primary transition-colors text-left"
                >
                  CONTACT
                </button>
              </nav>
            </SheetContent>
          </Sheet>
          
          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors"
            >
              HOME
            </button>
            <button 
              onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors"
            >
              PROGRAM
            </button>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors"
            >
              PRICING
            </button>
            <button 
              onClick={() => document.getElementById('trainers')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors"
            >
              TRAINERS
            </button>
            <button 
              onClick={() => document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors"
            >
              BEFORE & AFTER
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors"
            >
              CONTACT
            </button>
          </nav>
          
          <div className="hidden lg:flex items-center gap-3">
            <Dialog open={callDialogOpen} onOpenChange={setCallDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <Phone className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Call Us Now</DialogTitle>
                  <DialogDescription>
                    Click the button below to call us directly and speak with our fitness experts
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <a 
                    href={`tel:${PHONE_NUMBER}`}
                    className="text-2xl font-bold text-primary hover:underline"
                  >
                    {PHONE_NUMBER}
                  </a>
                  <Button 
                    size="lg" 
                    className="w-full rounded-full"
                    onClick={() => window.location.href = `tel:${PHONE_NUMBER}`}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={openWhatsApp} size="lg" className="rounded-full" data-testid="button-book-call-header">
              <MessageCircle className="h-4 w-4 mr-2" />
              Book A Free Call
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] md:min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full bg-neutral-800">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            src="/videos/hero.mp4"
            className="absolute inset-0 w-full h-full object-cover object-[75%_5%] md:object-center"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="container relative z-10 px-4 md:px-6 py-8 md:py-12 mt-32 md:mt-0">
          <div className="max-w-3xl lg:max-w-2xl">
            <div className="space-y-5 md:space-y-6">
              <h1 className="font-heading font-bold leading-[1.15] tracking-tight text-white text-center lg:text-left" style={{ fontSize: 'clamp(2rem, 7vw, 3.5rem)' }}>
                Transform Your
                <span className="block text-primary mt-2">
                  Body & Mind
                </span>
              </h1>
              <p className="text-white/95 leading-relaxed max-w-xl font-medium text-center lg:text-left" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>
                Expert-led online fitness programs designed exclusively for women. Train anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 items-center lg:items-start pt-2">
                <Button 
                  onClick={openWhatsApp} 
                  size="default"
                  className="rounded-full px-6 py-3 md:px-8 md:py-6 transition-all hover:scale-105 bg-primary hover:bg-primary/90 font-semibold text-sm md:text-base text-black"
                  data-testid="button-book-consultation-hero"
                >
                  <MessageCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-black" />
                  Start Your Journey
                </Button>
                <Button 
                  variant="outline" 
                  size="default"
                  className="rounded-full px-6 py-3 md:px-8 md:py-6 border-2 border-white bg-white/95 hover:bg-white hover:border-white transition-all hover:scale-105 font-semibold text-sm md:text-base text-foreground"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-view-packages"
                >
                  View Packages
                </Button>
              </div>
              <div className="flex justify-center lg:justify-start">
                <a 
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-wrap items-center gap-3 lg:gap-5 bg-black/70 hover:bg-black/80 backdrop-blur-md px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer group border border-white/30 hover:border-white/50"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex group-hover:scale-110 transition-transform duration-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-white">4.8/5.0</span>
                  </div>
                  <div className="hidden md:block h-4 w-px bg-white/30" />
                  <div className="hidden md:block text-sm font-bold text-white whitespace-nowrap">
                    <span className="text-primary font-bold">1000+</span> Success Stories
                  </div>
                  <div className="hidden md:flex text-xs text-white/80 group-hover:text-white transition-colors items-center gap-1">
                    <span>View Reviews</span>
                    <TrendingUp className="h-3 w-3" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <section className="bg-primary/5 border-y border-primary/20 py-5">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-center gap-3 max-w-4xl mx-auto">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Info className="h-4 w-4 text-primary" />
            </div>
            <p className="text-center text-sm md:text-base text-primary font-semibold">
              <strong>Important:</strong> We only offer online classes. No offline batches available.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-10 md:py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/20 relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)]" />
        <div className="container px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-block mb-3 md:mb-4">
                <span className="bg-primary text-black px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-lg shadow-primary/30 border border-primary/20">
                  Get Started Today
                </span>
              </div>
              <h2 className="font-heading font-bold mb-3 md:mb-6 tracking-tight" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.75rem)' }}>
                Start Your Transformation
              </h2>
              <p className="text-foreground/60 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.25rem)' }}>
                Fill out the form and we'll contact you within 24 hours to discuss your fitness goals
              </p>
            </div>
            <Card className="p-4 md:p-6 lg:p-8 shadow-xl shadow-primary/10 border-2 border-primary/20 backdrop-blur hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" type="email" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="10-digit mobile number" {...field} data-testid="input-contact" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What's the purpose of joining this program?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-purpose">
                              <SelectValue placeholder="Select your goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="weight-loss">Overall Weight Loss</SelectItem>
                            <SelectItem value="body-toning">For Body Toning</SelectItem>
                            <SelectItem value="postpartum">Reducing Postpartum Belly Fat</SelectItem>
                            <SelectItem value="strength-building">Build Strength/Endurance/Flexibility</SelectItem>
                            <SelectItem value="general-fitness">General Fitness</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    size="default" 
                    className="w-full rounded-full text-sm py-4" 
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-form"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>

      {/* Transformation Gallery */}
      <section className="py-6 md:py-8 pb-10 md:pb-14 bg-gradient-to-b from-background via-primary/5 to-background" id="transformations">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <span className="bg-primary text-black px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/30 border border-primary/20">
                Real Results
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-primary">
                Shape Your Body
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Real transformations from real women who took the first step towards a healthier lifestyle</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3 md:gap-5 max-w-sm md:max-w-2xl mx-auto">
            <div className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={transformationImage} 
                alt="Before and after transformation" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-semibold text-lg">Amazing Transformation</p>
                <p className="text-white/80 text-sm">Dedication brings results</p>
              </div>
            </div>
            <div className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={onlineClassImage} 
                alt="Online fitness class" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-semibold text-lg">Live Interactive Classes</p>
                <p className="text-white/80 text-sm">Join from anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="pt-10 md:pt-14 py-8 md:py-12 bg-gradient-to-br from-primary/5 to-accent/10 relative overflow-hidden" id="program">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="container px-4 md:px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <span className="bg-primary text-black px-5 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-lg shadow-primary/30 border border-primary/20">
                  Exclusively For Women
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Only Designed For Ladies
              </h2>
              <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-6">
                Start your weight loss journey with HOC FITNESS
              </h3>
            </div>
            
            <div className="bg-card p-6 md:p-10 rounded-3xl border-2 border-primary/20 shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
              <p className="text-center text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                We conduct Online LIVE Fitness Classes Daily: ZUMBA, Yoga, Aerobics, Weight Loss Program, HIIT, Cardio, TONE UP & More.
              </p>
              
              <div className="mb-6 text-center">
                <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-heading text-2xl md:text-3xl font-bold mb-2">Flexible Time Slots</h4>
                <p className="text-sm md:text-base text-muted-foreground">Choose what works best for your schedule</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6 max-w-4xl mx-auto">
                <div className="flex items-start gap-3 p-5 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block mb-1">Morning Sessions</span>
                    <span className="text-muted-foreground text-sm md:text-base">5:45AM - 7AM - 8AM - 11AM</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-5 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block mb-1">Evening Sessions</span>
                    <span className="text-muted-foreground text-sm md:text-base">6PM - 7:30PM</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="inline-flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full bg-primary border-2 border-primary/30 shadow-lg shadow-primary/30">
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-black flex-shrink-0 animate-pulse" />
                <span className="text-black font-bold text-xs md:text-sm">You can join Any-class, Any-Time, Any-Day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Types */}
      <section className="py-8 md:py-10 lg:py-12 bg-gradient-to-br from-primary/5 via-background to-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="container px-4 md:px-6 relative max-w-6xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-block mb-3 md:mb-4">
              <span className="bg-primary text-black px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-lg shadow-primary/30 border border-primary/20">
                Diverse Workouts
              </span>
            </div>
            <h2 className="font-heading font-bold mb-3 md:mb-4 tracking-tight" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
              Our Training Programs
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.125rem)' }}>Comprehensive programs for every fitness level and goal</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {[
              { image: cardioImage, title: "Cardio Core", desc: "High-energy workouts that elevate your heart rate, boost endurance, and burn calories effectively.", icon: Flame },
              { image: functionalImage, title: "Functional Training", desc: "Improve daily performance, reduce injury risk, and enhance flexibility with practical movements.", icon: Target },
              { image: strengthImage, title: "Strength Training", desc: "Build muscle, increase power, and develop total body strength with progressive resistance workouts.", icon: Dumbbell },
              { image: mobilityImage, title: "Mobility Exercise", desc: "Enhance your range of motion and reduce stiffness with targeted mobility work.", icon: Activity },
              { image: yogaImage, title: "Yoga Training", desc: "Holistic practice combining postures, breathwork, and meditation for mind-body harmony.", icon: Heart },
              { image: zumbaImage, title: "Zumba / Aerobics", desc: "Fun cardio dance workouts that keep you active, energized, and engaged.", icon: Zap },
            ].map((item, i) => (
              <Card key={i} className="group overflow-hidden hover-elevate border-slate-200 shadow-md hover:shadow-xl transition-all duration-500 bg-white hover:border-slate-300">
                <div className="relative h-48 md:h-56 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-3 md:p-4 space-y-1.5">
                  <h3 className="font-heading text-base md:text-lg font-bold text-slate-800 group-hover:text-slate-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-xs md:text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-6 md:py-8 relative overflow-hidden" id="pricing">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container px-4 md:px-6 relative">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <span className="bg-primary text-black px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/30 border border-primary/20">
                💰 Flexible Pricing
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Choose Your Package
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">Flexible plans designed for your success and transformation journey</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[
              {
                name: "1 Month",
                classes: "26 Classes",
                price: "₹2,999",
                features: [
                  "Customized Diet Plan",
                  "All fitness classes included",
                  "Cardio, HIIT, Yoga, Zumba",
                  "Strength training & aerobics",
                  "Meditation & Pranayam"
                ]
              },
              {
                name: "3 Months",
                classes: "85 Classes",
                price: "₹6,999",
                features: [
                  "Customized Diet Plan",
                  "All fitness classes included",
                  "Cardio, HIIT, Yoga, Zumba",
                  "Body toning & Pilates",
                  "Functional training",
                  "Best value for commitment"
                ],
                featured: true
              },
              {
                name: "6 Months",
                classes: "UNLIMITED Classes",
                price: "₹9,999",
                features: [
                  "Customized Diet Plan",
                  "Unlimited class access",
                  "All fitness programs",
                  "Priority support",
                  "Maximum flexibility",
                  "Best for transformation"
                ]
              },
            ].map((pkg, i) => (
              <Card key={i} className={`group p-4 md:p-5 hover-elevate transition-all duration-500 ${pkg.featured ? 'border-primary border-2 shadow-lg shadow-primary/15 bg-gradient-to-br from-primary/5 to-accent/5' : 'border-primary/10 shadow-md shadow-primary/5 bg-gradient-to-br from-background to-accent/5'} hover:shadow-lg hover:shadow-primary/15 hover:border-primary/30 relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent ${pkg.featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500`} />
                <CardContent className="p-0 space-y-3 md:space-y-4">
                  {pkg.featured && (
                    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm shadow-primary/30">
                      <Star className="h-3 w-3 fill-white" />
                      Most Popular
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading text-lg md:text-xl font-bold mb-1 group-hover:text-primary transition-colors">{pkg.name}</h3>
                    <p className="text-foreground/60 font-medium text-xs md:text-sm">{pkg.classes}</p>
                  </div>
                  <div className="font-heading text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {pkg.price}
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 group/item">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                        <span className="text-xs md:text-sm text-foreground/80 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={openWhatsApp} 
                    className={`w-full rounded-full py-4 text-xs md:text-sm font-semibold transition-all duration-300 ${pkg.featured ? 'shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40' : 'hover:bg-primary hover:text-primary-foreground'}`}
                    variant={pkg.featured ? "default" : "outline"}
                    data-testid={`button-select-${pkg.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Trainers */}
      <section className="py-8 md:py-10 lg:py-12 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 relative overflow-hidden" id="trainers">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="container px-4 md:px-6 relative max-w-5xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-block mb-3 md:mb-4">
              <span className="bg-primary text-black px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-lg shadow-primary/30 border border-primary/20">
                Expert Team
              </span>
            </div>
            <h2 className="font-heading font-bold mb-3 md:mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
              Meet Your Trainers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.125rem)' }}>Certified professionals dedicated to transforming your fitness journey</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                name: "Snata Pattnaik",
                role: "Founder & Managing Director",
                image: trainer1Image,
                bio: "10 years of experience inspiring, training, and transforming people across Delhi NCR, Bangalore, Mumbai, and Kolkata."
              },
              {
                name: "Neha Kashyap",
                role: "Zumba & Dance Trainer",
                image: trainer2Image,
                bio: "10+ years Zumba trainer with Shiamak Davar Institute training. Certified yoga and dance fitness trainer."
              },
              {
                name: "Manisha",
                role: "Strength & Weight Loss Specialist",
                image: trainer3Image,
                bio: "Passionate about health and helping people achieve their fitness goals through strength training and weight loss programs."
              },
            ].map((trainer, i) => (
              <Card key={i} className="group p-5 md:p-6 hover-elevate bg-card/50 backdrop-blur border-2 border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/15">
                <CardContent className="p-0 space-y-4 text-center">
                  <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-primary/20 group-hover:border-primary/40 transition-all duration-500 shadow-lg">
                      <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg md:text-xl font-bold mb-1.5 group-hover:text-primary transition-colors">{trainer.name}</h3>
                    <p className="text-xs md:text-sm text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-full inline-block">{trainer.role}</p>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{trainer.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg overflow-hidden shadow-md">
                  <img src={gymLogo} alt="HOC Fitness" className="h-full w-full object-cover" />
                </div>
                <span className="font-heading text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                  HOC Fitness
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Includes all classes – Cardio core, HIIT, Yoga, Zumba, strength training, aerobics, Meditation and Pranayam, pilates, Body toning up & more.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover-elevate h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center" data-testid="link-facebook">
                  <Facebook className="h-5 w-5 text-primary" />
                </a>
                <a href="#" className="hover-elevate h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center" data-testid="link-instagram">
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
                <a href="#" className="hover-elevate h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center" data-testid="link-youtube">
                  <Youtube className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Home</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-primary">Contact</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4">Get In Touch</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <a 
                    href="https://www.google.com/maps/place/House+Of+Champions+Gym/@19.2361639,73.1543851,17z/data=!3m1!4b1!4m6!3m5!1s0x3be795049d6e75a1:0xa3bb5dfe6f0afeaa!8m2!3d19.2361639!4d73.15696!16s%2Fg%2F11w18ww9mr?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    Basement, Gangagodavari Apt, below Sundar Classes, Katemanivali, Naka, Kalyan, Maharashtra 421306
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <a href="tel:+918600126395" className="text-muted-foreground hover:text-primary transition-colors">+91 8600126395</a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <a href="mailto:abhijeet18012001@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">abhijeet18012001@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>Copyright © 2025 Hoc Fitness. All Rights Reserved</p>
          </div>
        </div>
      </footer>

      {/* Floating Contact Icon - All Screens */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          {/* Contact Options - Appear Above Icon */}
          {contactMenuOpen && (
            <div className="absolute bottom-20 right-0 w-56 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden mb-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
              <button
                onClick={() => {
                  openWhatsApp();
                  setContactMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-primary/5 transition-colors border-b"
                data-testid="button-contact-whatsapp"
              >
                <SiWhatsapp className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">WhatsApp</span>
              </button>
              
              <button
                onClick={() => {
                  window.location.href = `tel:${PHONE_NUMBER}`;
                  setContactMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-primary/5 transition-colors"
                data-testid="button-contact-call"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Call</span>
              </button>
            </div>
          )}
          
          {/* Floating Button */}
          <button
            onClick={() => setContactMenuOpen(!contactMenuOpen)}
            className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
            aria-label="Contact Us"
            data-testid="button-floating-contact"
          >
            <MessageCircle className="h-7 w-7" />
          </button>
        </div>
      </div>
    </div>
  );
}
