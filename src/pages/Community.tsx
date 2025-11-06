import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  MessageSquare,
  Github,
  Youtube,
  Calendar,
  Award,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Community() {
  const resources = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Documentation",
      description: "Comprehensive guides, tutorials, and API references",
      link: "/docs",
      badge: "Essential",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Community Forum",
      description: "Ask questions, share knowledge, and connect with other users",
      link: "/forum",
      badge: "Active",
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub",
      description: "Star our repo, report issues, and contribute to the project",
      link: "https://github.com",
      badge: "15K+ Stars",
      external: true,
    },
    {
      icon: <Youtube className="h-6 w-6" />,
      title: "Video Tutorials",
      description: "Watch step-by-step guides and workflow demonstrations",
      link: "/tutorials",
      badge: "New",
    },
  ];

  const events = [
    {
      type: "Webinar",
      title: "Advanced Workflow Patterns",
      date: "Jan 15, 2025",
      time: "2:00 PM EST",
      description: "Learn advanced techniques for building scalable workflows",
    },
    {
      type: "Workshop",
      title: "Building AI-Powered Automations",
      date: "Jan 22, 2025",
      time: "11:00 AM EST",
      description: "Hands-on workshop on integrating AI into your workflows",
    },
    {
      type: "Meetup",
      title: "FlowForge Community Meetup - SF",
      date: "Feb 5, 2025",
      time: "6:00 PM PST",
      description: "Network with local FlowForge users and share experiences",
    },
  ];

  const champions = [
    {
      name: "Alex Rivera",
      role: "Automation Expert",
      contributions: "120+ workflows shared",
      avatar: "AR",
    },
    {
      name: "Samantha Lee",
      role: "Community Leader",
      contributions: "500+ forum answers",
      avatar: "SL",
    },
    {
      name: "Michael Chen",
      role: "Integration Specialist",
      contributions: "30+ custom integrations",
      avatar: "MC",
    },
    {
      name: "Emily Davis",
      role: "Tutorial Creator",
      contributions: "50+ video tutorials",
      avatar: "ED",
    },
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "50K+", label: "Community Members" },
    { icon: <MessageSquare className="h-6 w-6" />, value: "10K+", label: "Forum Discussions" },
    { icon: <BookOpen className="h-6 w-6" />, value: "500+", label: "Tutorials Published" },
    { icon: <TrendingUp className="h-6 w-6" />, value: "1M+", label: "Workflows Shared" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Community
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Join the
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {" "}
                FlowForge Community
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with thousands of automation enthusiasts, share workflows, and learn from
              experts. Together, we're building the future of work automation.
            </p>
          </div>

          {/* Community Stats */}
          <section className="mb-20 animate-scale-in">
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="bg-gradient-primary p-3 rounded-xl w-fit mx-auto mb-3">
                      <div className="text-primary-foreground">{stat.icon}</div>
                    </div>
                    <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Resources */}
          <section className="mb-20 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12">Community Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <Card
                  key={index}
                  className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="bg-gradient-primary p-3 rounded-xl group-hover:shadow-glow transition-all">
                        <div className="text-primary-foreground">{resource.icon}</div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {resource.badge}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a
                        href={resource.link}
                        target={resource.external ? "_blank" : undefined}
                        rel={resource.external ? "noopener noreferrer" : undefined}
                      >
                        Learn More
                        {resource.external && <ExternalLink className="ml-2 h-3 w-3" />}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="mb-20 animate-fade-in-up">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <Button variant="outline" asChild>
                <Link to="/events">View All Events</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <Badge className="bg-gradient-secondary text-secondary-foreground">
                        {event.type}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🕐</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Community Champions */}
          <section className="mb-20 animate-scale-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Community Champions</h2>
              <p className="text-xl text-muted-foreground">
                Meet our top contributors who make FlowForge amazing
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {champions.map((champion, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary-foreground group-hover:shadow-glow transition-all">
                      {champion.avatar}
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {champion.name}
                    </h3>
                    <Badge className="mb-3 bg-muted text-foreground border-border">
                      {champion.role}
                    </Badge>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Award className="h-4 w-4 text-secondary" />
                      <span>{champion.contributions}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center animate-fade-in-up">
            <Card className="border-2 border-primary bg-gradient-primary text-primary-foreground p-12">
              <h3 className="text-4xl font-bold mb-6">Ready to Join?</h3>
              <p className="text-xl mb-8 opacity-90">
                Become part of our growing community and start learning today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="text-lg" asChild>
                  <Link to="/signup">Join the Community</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link to="/forum">Visit Forum</Link>
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
