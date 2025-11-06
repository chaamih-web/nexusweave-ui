import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Workflow,
  Code2,
  Zap,
  Shield,
  Users,
  BarChart3,
  Globe,
  GitBranch,
  Clock,
  Database,
  Webhook,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Features() {
  const mainFeatures = [
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "Visual Workflow Builder",
      description:
        "Create complex automations with our intuitive drag-and-drop interface. No coding required to get started.",
      benefits: [
        "Drag-and-drop node editor",
        "Real-time workflow preview",
        "Template library access",
        "Visual debugging tools",
      ],
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Custom Code Nodes",
      description:
        "Write custom JavaScript or Python when you need full control. Seamlessly integrate with visual nodes.",
      benefits: [
        "JavaScript & Python support",
        "npm package imports",
        "IDE-like code editor",
        "Syntax highlighting & autocomplete",
      ],
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Performance",
      description:
        "Execute workflows in milliseconds with our optimized runtime engine. Scale to millions of executions.",
      benefits: [
        "Sub-second execution",
        "Auto-scaling infrastructure",
        "99.9% uptime SLA",
        "Global edge network",
      ],
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description:
        "Bank-grade encryption and compliance certifications. Your data is always protected.",
      benefits: [
        "SOC 2 Type II certified",
        "GDPR & HIPAA compliant",
        "End-to-end encryption",
        "SSO & MFA support",
      ],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description:
        "Work together with your team. Share workflows, set permissions, and track changes.",
      benefits: [
        "Role-based access control",
        "Version control & history",
        "Workflow sharing",
        "Team workspaces",
      ],
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Monitoring",
      description:
        "Track every execution with detailed logs and metrics. Identify bottlenecks and optimize performance.",
      benefits: [
        "Real-time monitoring",
        "Execution logs & traces",
        "Performance metrics",
        "Custom alerts & notifications",
      ],
    },
  ];

  const technicalFeatures = [
    { icon: <Globe className="h-5 w-5" />, title: "500+ Integrations", description: "Connect with all your favorite apps" },
    { icon: <GitBranch className="h-5 w-5" />, title: "Version Control", description: "Track changes with Git-like versioning" },
    { icon: <Clock className="h-5 w-5" />, title: "Scheduled Triggers", description: "Run workflows on any schedule" },
    { icon: <Database className="h-5 w-5" />, title: "Built-in Database", description: "Store data without external databases" },
    { icon: <Webhook className="h-5 w-5" />, title: "Webhooks", description: "Trigger workflows from any app" },
    { icon: <Lock className="h-5 w-5" />, title: "Secret Management", description: "Securely store API keys and credentials" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Powerful Features
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Everything You Need to
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {" "}
                Automate Smarter
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              FlowForge combines intuitive design with powerful capabilities. Build workflows that
              scale from simple automations to complex enterprise systems.
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {mainFeatures.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="bg-gradient-primary p-4 rounded-xl w-fit mb-4 group-hover:shadow-glow transition-all">
                    <div className="text-primary-foreground">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technical Features */}
          <section className="mb-20 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12">
              More Powerful Capabilities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-muted p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Comparison Section */}
          <section className="mb-20 animate-scale-in">
            <Card className="border-2 border-primary/20 bg-gradient-primary/5 overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Why FlowForge?</h2>
                  <p className="text-xl text-muted-foreground">
                    See how we compare to other automation platforms
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                      3x
                    </div>
                    <p className="text-muted-foreground">Faster workflow execution</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                      50%
                    </div>
                    <p className="text-muted-foreground">Lower cost than competitors</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                      99.9%
                    </div>
                    <p className="text-muted-foreground">Guaranteed uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center animate-fade-in-up">
            <Card className="border-2 border-primary bg-gradient-primary text-primary-foreground p-12">
              <h3 className="text-4xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-xl mb-8 opacity-90">
                Try all features free for 14 days. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="text-lg" asChild>
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link to="/demo">Schedule Demo</Link>
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
