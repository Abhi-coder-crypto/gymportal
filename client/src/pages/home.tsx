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
  Loader2
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import heroImage from "@assets/generated_images/Hero_fitness_workout_woman_6806a3a8.png";
import transformationImage from "@assets/generated_images/Transformation_before_after_results_1ed81a38.png";
import onlineClassImage from "@assets/generated_images/Online_fitness_class_women_c03f2b22.png";
import trainerImage from "@assets/generated_images/Fitness_trainer_professional_portrait_9ee854b5.png";

const WHATSAPP_NUMBER = "918600126395";

export default function Home() {
  const { toast } = useToast();

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
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Dumbbell className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-[#c026d3] bg-clip-text text-transparent">
              Bliss & Burn
            </span>
          </div>
          <Button onClick={openWhatsApp} size="lg" className="rounded-full" data-testid="button-book-call-header">
            <Phone className="h-4 w-4 mr-2" />
            Book A Free Call
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-[#c026d3]/5">
        <div className="container py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  India's #1 Online Fitness Program
                </div>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Join India's #1{" "}
                <span className="bg-gradient-to-r from-primary to-[#c026d3] bg-clip-text text-transparent">
                  Online Fitness
                </span>{" "}
                Program for Women
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Flexible, expert-led fitness programs designed for busy professionals. Train anytime, anywhere with proven results.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={openWhatsApp} 
                  size="lg" 
                  className="rounded-full text-lg px-8 py-6"
                  data-testid="button-book-consultation-hero"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Book Your Free Consultation
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full text-lg px-8 py-6"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-view-packages"
                >
                  View Packages
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.8 rating</span>
                </div>
                <div className="h-6 w-px bg-border" />
                <div className="text-sm font-medium">
                  <span className="text-primary font-bold">1000+</span> Transformations
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={heroImage} 
                  alt="Woman doing fitness workout" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <section className="bg-destructive/10 border-y border-destructive/20 py-4">
        <div className="container">
          <p className="text-center text-sm md:text-base text-destructive font-medium">
            <strong>Note:</strong> We only offer online classes. No offline batches available.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-[#c026d3]/5" id="contact">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Start Your Transformation Today
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>
            <Card className="p-8 md:p-12">
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
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-[#c026d3] bg-clip-text text-transparent">
                Shape Your Body
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">Real transformations from real women</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={transformationImage} 
                alt="Before and after transformation" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={onlineClassImage} 
                alt="Online fitness class" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-[#c026d3]/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Only Designed For Ladies
            </h2>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-primary mb-6">
              Start your weight loss journey with BLISS & BURN
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              We conduct Online LIVE Fitness Classes Daily: ZUMBA, Yoga, Aerobics, Weight Loss Program, HIIT, Cardio, TONE UP & More.
            </p>
            <div className="bg-card p-8 rounded-2xl border">
              <h4 className="font-heading text-xl font-semibold mb-4">Time Slots</h4>
              <div className="space-y-3 text-left max-w-2xl mx-auto">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium">Morning Sessions:</span> 5:45AM - 7AM - 8AM - 11AM
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium">Evening Sessions:</span> 6PM - 7:30PM
                </p>
                <p className="flex items-center gap-2 text-primary font-semibold">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  You can join Any-class, Any-Time, Any-Day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-muted-foreground">The finest early education in fitness</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 hover-elevate">
              <CardContent className="p-0 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Kindness</h3>
                <p className="text-muted-foreground">
                  Kindness in fitness promotes supportive environment.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 hover-elevate">
              <CardContent className="p-0 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Smile className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Emotional</h3>
                <p className="text-muted-foreground">
                  Nurtures mental health, recognizing the integral role of emotions.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 hover-elevate">
              <CardContent className="p-0 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Creativity</h3>
                <p className="text-muted-foreground">
                  Diverse approaches, making workouts engaging, fun, and sustainable.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 hover-elevate">
              <CardContent className="p-0 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  Innovation new methods for optimal performance and health.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Types */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-[#c026d3]/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our Variations to Shape You
            </h2>
            <p className="text-lg text-muted-foreground">Age-specific support for every stage</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Flame, title: "Cardio Core", desc: "Any exercise elevating heart rate and engaging the cardiovascular system, improving endurance and overall fitness." },
              { icon: Zap, title: "Functional Training", desc: "Highly beneficial for improving daily life performance, reducing the risk of injury, and increasing flexibility and balance." },
              { icon: Dumbbell, title: "Strength Training", desc: "Any exercise that makes your muscles work harder than usual. This increases your muscles' strength, size, power and endurance." },
              { icon: Activity, title: "Mobility Exercise", desc: "Mobility exercise will help increase your body's range of motion and bring down the overall stiffness of the body." },
              { icon: Target, title: "Yoga Training", desc: "A holistic practice intertwining physical postures, breathwork, and meditation to foster harmony between body and mind." },
              { icon: Users, title: "Zumba / Aerobics", desc: "A cardio dance workout. It is a wonderful way to keep your heart active, your body healthy, and your mind engaged." },
            ].map((item, i) => (
              <Card key={i} className="p-6 hover-elevate">
                <CardContent className="p-0 space-y-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-16 md:py-24" id="pricing">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Choose Your Package
            </h2>
            <p className="text-lg text-muted-foreground">Flexible plans to fit your goals</p>
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
              <Card key={i} className={`p-8 hover-elevate ${pkg.featured ? 'border-primary border-2' : ''}`}>
                <CardContent className="p-0 space-y-6">
                  {pkg.featured && (
                    <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-muted-foreground">{pkg.classes}</p>
                  </div>
                  <div className="font-heading text-4xl font-bold text-primary">
                    {pkg.price}
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={openWhatsApp} 
                    className="w-full rounded-full" 
                    variant={pkg.featured ? "default" : "outline"}
                    data-testid={`button-select-${pkg.name.toLowerCase().replace(' ', '-')}`}
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Trainers */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-[#c026d3]/5">
        <div className="container">
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
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-[#c026d3] text-primary-foreground">
        <div className="container text-center">
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
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-heading text-xl font-bold bg-gradient-to-r from-primary to-[#c026d3] bg-clip-text text-transparent">
                  Bliss & Burn
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
            <p>Copyright © 2025 Bliss & Burn. All Rights Reserved</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-pulse"
        data-testid="button-whatsapp-float"
        aria-label="Contact on WhatsApp"
      >
        <SiWhatsapp className="h-7 w-7" />
      </button>
    </div>
  );
}
