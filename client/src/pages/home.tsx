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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  Menu
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import heroImage from "@assets/generated_images/Hero_fitness_workout_woman_6806a3a8.png";
import transformationImage from "@assets/generated_images/Transformation_before_after_results_1ed81a38.png";
import onlineClassImage from "@assets/generated_images/Online_fitness_class_women_c03f2b22.png";
import trainerImage from "@assets/generated_images/Fitness_trainer_professional_portrait_9ee854b5.png";
import cardioImage from "@assets/generated_images/Woman_doing_cardio_workout_1ba27fe8.png";
import functionalImage from "@assets/generated_images/Functional_training_exercise_e1989ece.png";
import strengthImage from "@assets/generated_images/Strength_training_with_weights_f007c33a.png";
import mobilityImage from "@assets/generated_images/Mobility_and_flexibility_exercise_26512ec9.png";
import yogaImage from "@assets/generated_images/Yoga_meditation_pose_691f5267.png";
import zumbaImage from "@assets/generated_images/Zumba_dance_fitness_class_875f492b.png";

const WHATSAPP_NUMBER = "918600126395";
const PHONE_NUMBER = "+91 8600126395";
const GOOGLE_REVIEWS_URL = "https://share.google/BOqrkzB7sb4X33Iy0";

export default function Home() {
  const { toast } = useToast();
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Dumbbell className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl md:text-2xl font-bold text-primary">
              Hoc Fitness
            </span>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-6 mt-8">
                <button 
                  onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  HOME
                </button>
                <button 
                  onClick={() => { document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  PROGRAM
                </button>
                <button 
                  onClick={() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  PRICING
                </button>
                <button 
                  onClick={() => { document.getElementById('trainers')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  TRAINERS
                </button>
                <button 
                  onClick={() => { document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  BEFORE & AFTER
                </button>
                <button 
                  onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                  className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  CONTACT
                </button>
              </nav>
            </SheetContent>
          </Sheet>
          
          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              HOME
            </button>
            <button 
              onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              PROGRAM
            </button>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              PRICING
            </button>
            <button 
              onClick={() => document.getElementById('trainers')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              TRAINERS
            </button>
            <button 
              onClick={() => document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              BEFORE & AFTER
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
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
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center lg:overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.08),transparent_50%)]" />
        <div className="container py-4 lg:py-12 relative px-4 md:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-2 sm:space-y-3 lg:space-y-8 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <div className="bg-gradient-to-r from-primary/20 to-accent/40 backdrop-blur-sm border border-primary/20 text-primary px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide">
                  ✨ India's #1 Online Fitness Program
                </div>
              </div>
              <h1 className="font-heading text-[28px] sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight lg:leading-[1.1] tracking-tight">
                Transform Your
                <span className="block text-primary mt-1">
                  Body & Mind
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 max-w-xl leading-relaxed mx-auto lg:mx-0">
                Expert-led online fitness programs designed exclusively for women. Train anytime, anywhere.
              </p>
              <div className="flex flex-wrap gap-3 lg:gap-5 justify-center lg:justify-start">
                <Button 
                  onClick={openWhatsApp} 
                  size="default"
                  className="rounded-full text-sm lg:text-base px-6 py-3 lg:px-10 lg:py-7 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  data-testid="button-book-consultation-hero"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Your Journey
                </Button>
                <Button 
                  variant="outline" 
                  size="default"
                  className="rounded-full text-sm lg:text-base px-6 py-3 lg:px-10 lg:py-7 border-2 hover:bg-primary/5"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-view-packages"
                >
                  View Packages
                </Button>
              </div>
              <a 
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-4 lg:gap-8 justify-center lg:justify-start bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 px-3 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer group border border-primary/10 hover:border-primary/30"
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex group-hover:scale-110 transition-transform duration-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="max-[360px]:h-3 max-[360px]:w-3 h-4 w-4 lg:h-5 lg:w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="max-[360px]:text-xs text-sm lg:text-base font-semibold">4.8/5.0</span>
                </div>
                <div className="h-4 w-px bg-border hidden md:block" />
                <div className="max-[360px]:text-xs text-sm lg:text-base font-semibold">
                  <span className="text-primary font-bold">1000+</span> Success
                </div>
                <div className="max-[360px]:hidden text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  <span className="hidden sm:inline">View Reviews</span>
                  <TrendingUp className="h-3 w-3" />
                </div>
              </a>
            </div>
            <div className="relative max-[360px]:hidden h-44 sm:h-60 lg:h-[500px] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
                <img 
                  src={heroImage} 
                  alt="Woman doing fitness workout" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <section className="bg-gradient-to-r from-destructive/10 via-destructive/15 to-destructive/10 border-y border-destructive/30 py-5 shadow-inner">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-center gap-3 max-w-4xl mx-auto">
            <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
              <Info className="h-4 w-4 text-destructive" />
            </div>
            <p className="text-center text-sm md:text-base text-destructive font-semibold">
              <strong>Important:</strong> We only offer online classes. No offline batches available.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/20 relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)]" />
        <div className="container px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/30">
                  Get Started Today
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Start Your Transformation
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                Fill out the form and we'll contact you within 24 hours to discuss your fitness goals
              </p>
            </div>
            <Card className="p-10 md:p-14 shadow-2xl shadow-primary/10 border-2 border-primary/20 backdrop-blur hover:shadow-3xl hover:shadow-primary/20 transition-all duration-500">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
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
                    size="lg" 
                    className="w-full rounded-full text-lg py-6" 
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-form"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
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
      <section className="py-10 md:py-12 bg-gradient-to-b from-background via-primary/5 to-background" id="transformations">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
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
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
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
            <div className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
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
      <section className="py-10 md:py-12 bg-gradient-to-br from-primary/5 to-accent/10 relative overflow-hidden" id="program">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="container px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block mb-6">
              <span className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-lg shadow-primary/30">
                Exclusively For Women
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Only Designed For Ladies
            </h2>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-primary mb-6">
              Start your weight loss journey with HOC FITNESS
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We conduct Online LIVE Fitness Classes Daily: ZUMBA, Yoga, Aerobics, Weight Loss Program, HIIT, Cardio, TONE UP & More.
            </p>
            <div className="bg-card p-8 md:p-10 rounded-3xl border-2 border-primary/20 shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 backdrop-blur">
              <div className="mb-6">
                <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-heading text-2xl font-bold mb-2">Flexible Time Slots</h4>
                <p className="text-sm text-muted-foreground">Choose what works best for your schedule</p>
              </div>
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Morning Sessions:</span>
                    <span className="text-muted-foreground ml-2">5:45AM - 7AM - 8AM - 11AM</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Evening Sessions:</span>
                    <span className="text-muted-foreground ml-2">6PM - 7:30PM</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                  <Zap className="h-6 w-6 text-primary flex-shrink-0 animate-pulse" />
                  <span className="text-primary font-bold text-lg">You can join Any-class, Any-Time, Any-Day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Types */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="container px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-primary/20 to-accent/30 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20">
                Diverse Workouts
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Our Training Programs
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">Comprehensive programs for every fitness level and goal</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: cardioImage, title: "Cardio Core", desc: "High-energy workouts that elevate your heart rate, boost endurance, and burn calories effectively.", icon: Flame },
              { image: functionalImage, title: "Functional Training", desc: "Improve daily performance, reduce injury risk, and enhance flexibility with practical movements.", icon: Target },
              { image: strengthImage, title: "Strength Training", desc: "Build muscle, increase power, and develop total body strength with progressive resistance workouts.", icon: Dumbbell },
              { image: mobilityImage, title: "Mobility Exercise", desc: "Enhance your range of motion and reduce stiffness with targeted mobility work.", icon: Activity },
              { image: yogaImage, title: "Yoga Training", desc: "Holistic practice combining postures, breathwork, and meditation for mind-body harmony.", icon: Heart },
              { image: zumbaImage, title: "Zumba / Aerobics", desc: "Fun cardio dance workouts that keep you active, energized, and engaged.", icon: Zap },
            ].map((item, i) => (
              <Card key={i} className="group overflow-hidden hover-elevate border-primary/10 shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 bg-gradient-to-br from-background to-accent/5 hover:border-primary/30">
                <div className="relative h-56 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 h-12 w-12 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-heading text-2xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-foreground/70 leading-relaxed text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-12 md:py-16 relative overflow-hidden" id="pricing">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-primary/20 to-accent/30 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20">
                💰 Flexible Pricing
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Choose Your Package
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">Flexible plans designed for your success and transformation journey</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              <Card key={i} className={`group p-10 hover-elevate transition-all duration-500 ${pkg.featured ? 'border-primary border-2 shadow-2xl shadow-primary/25 scale-105 hover:scale-110' : 'border-primary/10 shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-primary/15'} bg-gradient-to-br from-background to-accent/5 hover:border-primary/30 relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent ${pkg.featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500`} />
                <CardContent className="p-0 space-y-8">
                  {pkg.featured && (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/30 animate-pulse">
                      <Star className="h-4 w-4 fill-white" />
                      Most Popular
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading text-3xl font-bold mb-3 group-hover:text-primary transition-colors">{pkg.name}</h3>
                    <p className="text-foreground/60 font-medium text-lg">{pkg.classes}</p>
                  </div>
                  <div className="font-heading text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {pkg.price}
                  </div>
                  <ul className="space-y-4">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 group/item">
                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                        <span className="text-base text-foreground/80 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={openWhatsApp} 
                    className={`w-full rounded-full py-6 text-base font-semibold transition-all duration-300 ${pkg.featured ? 'shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40' : 'hover:bg-primary hover:text-primary-foreground'}`}
                    variant={pkg.featured ? "default" : "outline"}
                    data-testid={`button-select-${pkg.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Trainers */}
      <section className="py-10 md:py-12 bg-gradient-to-br from-primary/5 to-accent/10" id="trainers">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Meet Your Trainers
            </h2>
            <p className="text-lg text-muted-foreground">Professionals who can give you the best training</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Snata Pattnaik",
                role: "Founder & Managing Director",
                image: trainerImage,
                bio: "10 years of experience inspiring, training, and transforming people across Delhi NCR, Bangalore, Mumbai, and Kolkata."
              },
              {
                name: "Neha Kashyap",
                role: "Zumba & Dance Trainer",
                image: trainerImage,
                bio: "10+ years Zumba trainer with Shiamak Davar Institute training. Certified yoga and dance fitness trainer."
              },
              {
                name: "Manisha",
                role: "Strength & Weight Loss Specialist",
                image: trainerImage,
                bio: "Passionate about health and helping people achieve their fitness goals through strength training and weight loss programs."
              },
            ].map((trainer, i) => (
              <Card key={i} className="p-6 hover-elevate">
                <CardContent className="p-0 space-y-4 text-center">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                    <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold">{trainer.name}</h3>
                    <p className="text-sm text-primary font-medium">{trainer.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{trainer.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-12 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Your Best Self Is Waiting — Start Today
          </h2>
          <Button 
            onClick={openWhatsApp} 
            size="lg" 
            variant="secondary"
            className="rounded-full text-lg px-8 py-6"
            data-testid="button-book-consultation-cta"
          >
            <Phone className="h-5 w-5 mr-2" />
            Book Free Consultation
          </Button>
          <p className="mt-6 text-lg flex items-center justify-center gap-2">
            <Phone className="h-5 w-5" />
            +91 8600126395
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-heading text-xl font-bold text-primary">
                  Hoc Fitness
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
                  <span className="text-muted-foreground">Bengaluru, Karnataka</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">+91 8600126395</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">abhijeet18012001@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>Copyright © 2025 Hoc Fitness. All Rights Reserved</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons - Glassmorphic Design */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 lg:hidden">
        <button
          onClick={() => setCallDialogOpen(true)}
          className="group relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-110 transition-all duration-300 flex items-center justify-center backdrop-blur-xl border border-white/20"
          aria-label="Call Us"
        >
          <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:bg-white/30 transition-all" />
          <Phone className="h-6 w-6 relative z-10 animate-pulse" />
        </button>
        <button
          onClick={openWhatsApp}
          className="group relative h-16 w-16 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#1ea952] text-white shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 hover:scale-110 transition-all duration-300 flex items-center justify-center backdrop-blur-xl border border-white/20 animate-bounce"
          data-testid="button-whatsapp-float"
          aria-label="Contact on WhatsApp"
        >
          <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:bg-white/30 transition-all" />
          <SiWhatsapp className="h-7 w-7 relative z-10" />
        </button>
      </div>
      
      {/* Floating WhatsApp Button - Desktop Glassmorphic */}
      <button
        onClick={openWhatsApp}
        className="group hidden lg:flex fixed bottom-8 right-8 z-50 h-16 w-16 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#1ea952] text-white shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 hover:scale-110 transition-all duration-300 items-center justify-center backdrop-blur-xl border border-white/20 animate-bounce"
        data-testid="button-whatsapp-float-desktop"
        aria-label="Contact on WhatsApp"
      >
        <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:bg-white/30 transition-all" />
        <SiWhatsapp className="h-7 w-7 relative z-10" />
      </button>
    </div>
  );
}
