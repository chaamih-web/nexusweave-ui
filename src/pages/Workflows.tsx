import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, TrendingUp, Clock, Users, Sparkles } from "lucide-react";

export default function Workflows() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI", "Sales", "IT Ops", "Marketing", "Document Ops", "Support"];

  const workflows = [
    {
      id: 1,
      title: "Build Your First AI Agent",
      description: "Create an intelligent AI assistant that can handle customer queries automatically",
      category: "AI",
      author: "Sarah Chen",
      authorInitials: "SC",
      nodes: 5,
      complexity: "Beginner",
      featured: true,
    },
    {
      id: 2,
      title: "Automated Lead Scoring System",
      description: "Score and qualify leads automatically using multiple data sources",
      category: "Sales",
      author: "Mike Rodriguez",
      authorInitials: "MR",
      nodes: 8,
      complexity: "Intermediate",
      featured: true,
    },
    {
      id: 3,
      title: "Social Media Content Scheduler",
      description: "Schedule and post content across all your social platforms automatically",
      category: "Marketing",
      author: "Emma Wilson",
      authorInitials: "EW",
      nodes: 6,
      complexity: "Beginner",
      featured: false,
    },
    {
      id: 4,
      title: "IT Incident Response Automation",
      description: "Automatically detect, categorize, and route IT incidents to the right teams",
      category: "IT Ops",
      author: "James Park",
      authorInitials: "JP",
      nodes: 12,
      complexity: "Advanced",
      featured: true,
    },
    {
      id: 5,
      title: "Document Processing Pipeline",
      description: "Extract, process, and organize data from documents automatically",
      category: "Document Ops",
      author: "Lisa Anderson",
      authorInitials: "LA",
      nodes: 9,
      complexity: "Intermediate",
      featured: false,
    },
    {
      id: 6,
      title: "Customer Support Ticket Router",
      description: "Intelligently route support tickets based on content and priority",
      category: "Support",
      author: "David Kim",
      authorInitials: "DK",
      nodes: 7,
      complexity: "Intermediate",
      featured: false,
    },
    {
      id: 7,
      title: "Email Marketing Automation",
      description: "Create personalized email campaigns that send at optimal times",
      category: "Marketing",
      author: "Rachel Green",
      authorInitials: "RG",
      nodes: 10,
      complexity: "Intermediate",
      featured: false,
    },
    {
      id: 8,
      title: "Data Sync Between CRMs",
      description: "Keep your CRM data synchronized across multiple platforms in real-time",
      category: "Sales",
      author: "Tom Harris",
      authorInitials: "TH",
      nodes: 6,
      complexity: "Beginner",
      featured: false,
    },
  ];

  const filteredWorkflows =
    selectedCategory === "All"
      ? workflows
      : workflows.filter((w) => w.category === selectedCategory);

  const featuredWorkflows = workflows.filter((w) => w.featured);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Workflow Templates
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Jump-start your automation with pre-built templates. Customize and deploy in minutes.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search workflows, apps, use cases..."
                className="pl-12 h-14 text-lg shadow-md"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Section */}
          {selectedCategory === "All" && (
            <section className="mb-16 animate-scale-in">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-secondary" />
                <h2 className="text-3xl font-bold">Featured Workflows</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredWorkflows.map((workflow, index) => (
                  <Card
                    key={workflow.id}
                    className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge className="bg-gradient-primary text-primary-foreground">
                          {workflow.category}
                        </Badge>
                        <Badge variant="outline" className="border-secondary text-secondary">
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {workflow.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{workflow.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{workflow.nodes} nodes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{workflow.complexity}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                            {workflow.authorInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{workflow.author}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* All Workflows */}
          <section className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                {selectedCategory === "All" ? "All Workflows" : `${selectedCategory} Workflows`}
              </h2>
              <p className="text-muted-foreground">
                {filteredWorkflows.length} {filteredWorkflows.length === 1 ? "workflow" : "workflows"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkflows.map((workflow, index) => (
                <Card
                  key={workflow.id}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <Badge className="w-fit bg-primary/10 text-primary border-primary/20 mb-2">
                      {workflow.category}
                    </Badge>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {workflow.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{workflow.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{workflow.nodes} nodes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{workflow.complexity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-muted">
                          {workflow.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{workflow.author}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-20 text-center animate-fade-in-up">
            <Card className="border-2 border-primary/20 bg-gradient-primary/5 p-12">
              <h3 className="text-3xl font-bold mb-4">Can't Find What You Need?</h3>
              <p className="text-xl text-muted-foreground mb-6">
                Create your own custom workflow from scratch or request a template
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg">
                  Build Custom Workflow
                </Button>
                <Button variant="outline" size="lg">
                  Request Template
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
