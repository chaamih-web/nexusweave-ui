import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Zap,
  Code,
  Users,
  Shield,
  TrendingUp,
  Workflow,
  Clock,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import workflowIllustration from "@/assets/workflow-illustration.png";

export default function Home() {
  const features = [
    {
      icon: <Workflow className="h-6 w-6" />,
      title: "Visual Workflow Builder",
      description: "Build complex automations with our intuitive drag-and-drop interface.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Custom Code Nodes",
      description: "Write custom JavaScript or Python code when you need more control.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Execute workflows in milliseconds with our optimized runtime.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with SOC 2 and GDPR.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Work together with version control and role-based permissions.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Analytics & Monitoring",
      description: "Track workflow performance with detailed metrics and logs.",
    },
  ];

  const useCases = [
    { category: "IT Ops", action: "Automate infrastructure provisioning" },
    { category: "Sales", action: "Sync CRM data across platforms" },
    { category: "Marketing", action: "Schedule social media campaigns" },
    { category: "Support", action: "Auto-route customer tickets" },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "1M+", label: "Workflows Executed" },
    { value: "500+", label: "Integrations" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                🎉 New: AI-Powered Workflow Builder
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Automate Everything,
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {" "}
                  Simplify Work
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Build powerful workflow automations in minutes, not days. Connect your apps,
                automate repetitive tasks, and focus on what matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" size="lg" className="text-lg" asChild>
                  <Link to="/signup">
                    Start Building Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg" asChild>
                  <Link to="/workflows">Explore Templates</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  14-day free trial
                </div>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
              <img
                src={workflowIllustration}
                alt="Workflow automation"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">Built for Every Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From startups to enterprises, FlowForge powers automation across industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-gradient-primary text-primary-foreground">
                    {useCase.category}
                  </Badge>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {useCase.action}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="link" size="lg" asChild>
              <Link to="/use-cases">
                View All Use Cases <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features that make workflow automation a breeze
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="bg-gradient-primary p-3 rounded-xl w-fit mb-4 group-hover:shadow-glow transition-all">
                    <div className="text-primary-foreground">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-secondary fill-secondary" />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium mb-6 leading-relaxed">
            "FlowForge transformed how we handle operations. What used to take hours now happens
            in seconds. It's an absolute game-changer."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary" />
            <div className="text-left">
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-muted-foreground">Head of Operations, TechCorp</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Automate Your Workflow?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of teams already saving time with FlowForge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link to="/demo">Schedule Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
