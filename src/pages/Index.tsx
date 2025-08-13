import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Index() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Calculator state
  const [calcHours, setCalcHours] = useState([2]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStudio, setSelectedStudio] = useState('studio-a');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  
  // Booking state
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingDuration, setBookingDuration] = useState('2');
  const [bookingStudio, setBookingStudio] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const portfolioTracks = [
    { id: 1, title: "Electronic Dreams", artist: "DJ Aurora", duration: "3:24", genre: "Electronic" },
    { id: 2, title: "Acoustic Sessions", artist: "Indie Band", duration: "4:12", genre: "Acoustic" },
    { id: 3, title: "Urban Vibes", artist: "Hip-Hop Artist", duration: "3:45", genre: "Hip-Hop" },
    { id: 4, title: "Rock Anthem", artist: "The Rockers", duration: "4:33", genre: "Rock" }
  ];

  const services = [
    { id: "vocal", icon: "Mic", title: "Запись вокала", description: "Профессиональная запись вокальных партий в акустически обработанной студии", price: "от 3000₽", hourlyRate: 3000 },
    { id: "instruments", icon: "Music", title: "Запись инструментов", description: "Качественная запись гитар, барабанов, клавишных и других инструментов", price: "от 2500₽", hourlyRate: 2500 },
    { id: "mixing", icon: "Headphones", title: "Mixing & Mastering", description: "Сведение и мастеринг ваших треков до профессионального уровня", price: "от 5000₽", hourlyRate: 5000 },
    { id: "podcasts", icon: "Radio", title: "Подкасты", description: "Запись и обработка подкастов, аудиокниг и рекламных роликов", price: "от 2000₽", hourlyRate: 2000 }
  ];

  const studios = [
    { 
      id: "studio-a", 
      name: "Studio A", 
      description: "Основная студия с Neumann U87, SSL консолью", 
      equipment: ["SSL 4000E", "Neumann U87", "ProTools HDX"], 
      image: "/img/5f0f6b5e-144f-41c1-b3f8-d029cadbaa7d.jpg",
      hourlyRate: 4000,
      specs: {
        roomSize: "25 м²",
        acoustics: "Полная акустическая обработка",
        console: "SSL 4000E 32-канальный пульт",
        monitors: "Genelec 8050B, Yamaha NS-10M",
        microphones: ["Neumann U87", "AKG C414", "Shure SM57", "Royer R-121"]
      }
    },
    { 
      id: "studio-b", 
      name: "Studio B", 
      description: "Вокальная кабина с топовым оборудованием", 
      equipment: ["Avalon VT-737", "AKG C414", "Logic Pro"], 
      image: "/img/f9214b48-110f-42eb-898e-c605978dcbf9.jpg",
      hourlyRate: 3000,
      specs: {
        roomSize: "15 м²",
        acoustics: "Изоляционная кабина",
        console: "Avalon VT-737 канальный стрип",
        monitors: "KRK Rokit 8, Beyerdynamic DT770",
        microphones: ["AKG C414", "Audio-Technica AT4040", "Electro-Voice RE20"]
      }
    }
  ];

  const playTrack = (trackId: number) => {
    if (currentTrack === trackId && isPlaying) {
      setIsPlaying(false);
      setCurrentTrack(null);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
    }
  };

  // Price calculation
  useEffect(() => {
    const baseStudioRate = studios.find(s => s.id === selectedStudio)?.hourlyRate || 3000;
    const servicesCost = selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service?.hourlyRate || 0);
    }, 0);
    const totalHourlyRate = baseStudioRate + servicesCost;
    const totalPrice = totalHourlyRate * calcHours[0];
    setCalculatedPrice(totalPrice);
  }, [calcHours, selectedServices, selectedStudio]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleBooking = () => {
    alert(`Заявка отправлена!\nКлиент: ${clientName}\nТелефон: ${clientPhone}\nДата: ${bookingDate}\nВремя: ${bookingTime}\nДлительность: ${bookingDuration} ч.\nСтудия: ${bookingStudio}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 animate-pulse-slow"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-primary/15 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-slide-up">
            <div className="flex items-center justify-center mb-6">
              <Icon name="Radio" size={48} className="text-primary mr-4 animate-pulse-slow" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                SoundWave Studio
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Профессиональная студия звукозаписи с современным оборудованием. 
              Воплощаем ваши музыкальные идеи в жизнь.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Icon name="Calendar" size={20} className="mr-2" />
                    Забронировать студию
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Бронирование студии</DialogTitle>
                  </DialogHeader>
                  
                  <Tabs defaultValue="calculator" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="calculator">Калькулятор</TabsTrigger>
                      <TabsTrigger value="equipment">Оборудование</TabsTrigger>
                      <TabsTrigger value="booking">Бронирование</TabsTrigger>
                    </TabsList>

                    {/* Calculator Tab */}
                    <TabsContent value="calculator" className="space-y-6">
                      <div className="grid lg:grid-cols-2 gap-8">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-4">Параметры записи</h3>
                            
                            <div className="space-y-6">
                              <div>
                                <Label className="text-base font-medium">Студия</Label>
                                <Select value={selectedStudio} onValueChange={setSelectedStudio}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {studios.map(studio => (
                                      <SelectItem key={studio.id} value={studio.id}>
                                        {studio.name} - {studio.hourlyRate}₽/ч
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label className="text-base font-medium mb-4 block">
                                  Количество часов: {calcHours[0]} ч.
                                </Label>
                                <Slider
                                  value={calcHours}
                                  onValueChange={setCalcHours}
                                  max={12}
                                  min={1}
                                  step={0.5}
                                  className="w-full"
                                />
                              </div>

                              <div>
                                <Label className="text-base font-medium mb-3 block">Дополнительные услуги</Label>
                                <div className="space-y-3">
                                  {services.map(service => (
                                    <div key={service.id} className="flex items-center space-x-3">
                                      <Checkbox
                                        id={service.id}
                                        checked={selectedServices.includes(service.id)}
                                        onCheckedChange={() => handleServiceToggle(service.id)}
                                      />
                                      <Label htmlFor={service.id} className="text-sm cursor-pointer">
                                        {service.title} (+{service.hourlyRate}₽/ч)
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-4">Расчет стоимости</h3>
                            
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <span>Студия ({calcHours[0]} ч.):</span>
                                <span>{(studios.find(s => s.id === selectedStudio)?.hourlyRate || 0) * calcHours[0]}₽</span>
                              </div>
                              
                              {selectedServices.map(serviceId => {
                                const service = services.find(s => s.id === serviceId);
                                if (!service) return null;
                                return (
                                  <div key={serviceId} className="flex justify-between text-sm">
                                    <span>{service.title} ({calcHours[0]} ч.):</span>
                                    <span>+{service.hourlyRate * calcHours[0]}₽</span>
                                  </div>
                                );
                              })}
                              
                              <div className="border-t pt-4">
                                <div className="flex justify-between text-xl font-bold text-primary">
                                  <span>Итого:</span>
                                  <span>{calculatedPrice.toLocaleString()}₽</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* Equipment Tab */}
                    <TabsContent value="equipment" className="space-y-6">
                      <div className="grid lg:grid-cols-2 gap-8">
                        {studios.map(studio => (
                          <Card key={studio.id} className="overflow-hidden">
                            <div className="aspect-video relative">
                              <img 
                                src={studio.image} 
                                alt={studio.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-semibold mb-3">{studio.name}</h3>
                              <p className="text-muted-foreground mb-4">{studio.description}</p>
                              
                              <div className="space-y-3">
                                <div>
                                  <Badge variant="outline" className="mr-2">Площадь</Badge>
                                  <span className="text-sm">{studio.specs.roomSize}</span>
                                </div>
                                
                                <div>
                                  <Badge variant="outline" className="mr-2">Акустика</Badge>
                                  <span className="text-sm">{studio.specs.acoustics}</span>
                                </div>
                                
                                <div>
                                  <Badge variant="outline" className="mr-2">Консоль</Badge>
                                  <span className="text-sm">{studio.specs.console}</span>
                                </div>
                                
                                <div>
                                  <Badge variant="outline" className="mr-2 mb-2">Мониторы</Badge>
                                  <span className="text-sm">{studio.specs.monitors}</span>
                                </div>
                                
                                <div>
                                  <Badge variant="outline" className="mb-2">Микрофоны</Badge>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {studio.specs.microphones.map((mic, idx) => (
                                      <Badge key={idx} variant="secondary" className="text-xs">
                                        {mic}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="pt-3 border-t">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">Стоимость:</span>
                                    <Badge className="bg-primary text-lg px-3 py-1">
                                      {studio.hourlyRate}₽/ч
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Booking Tab */}
                    <TabsContent value="booking" className="space-y-6">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-6">Онлайн-бронирование</h3>
                          
                          <div className="grid lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="client-name">Ваше имя *</Label>
                                <Input 
                                  id="client-name"
                                  value={clientName}
                                  onChange={(e) => setClientName(e.target.value)}
                                  placeholder="Введите ваше имя"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="client-phone">Телефон *</Label>
                                <Input 
                                  id="client-phone"
                                  type="tel"
                                  value={clientPhone}
                                  onChange={(e) => setClientPhone(e.target.value)}
                                  placeholder="+7 (999) 123-45-67"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="booking-studio">Выбор студии</Label>
                                <Select value={bookingStudio} onValueChange={setBookingStudio}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите студию" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {studios.map(studio => (
                                      <SelectItem key={studio.id} value={studio.name}>
                                        {studio.name} - {studio.hourlyRate}₽/ч
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="booking-date">Дата записи</Label>
                                <Input 
                                  id="booking-date"
                                  type="date"
                                  value={bookingDate}
                                  onChange={(e) => setBookingDate(e.target.value)}
                                  min={new Date().toISOString().split('T')[0]}
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="booking-time">Время начала</Label>
                                <Select value={bookingTime} onValueChange={setBookingTime}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите время" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({length: 13}, (_, i) => i + 10).map(hour => (
                                      <SelectItem key={hour} value={`${hour}:00`}>
                                        {hour}:00
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label htmlFor="booking-duration">Продолжительность</Label>
                                <Select value={bookingDuration} onValueChange={setBookingDuration}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 час</SelectItem>
                                    <SelectItem value="2">2 часа</SelectItem>
                                    <SelectItem value="3">3 часа</SelectItem>
                                    <SelectItem value="4">4 часа</SelectItem>
                                    <SelectItem value="6">6 часов</SelectItem>
                                    <SelectItem value="8">8 часов</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-8 pt-6 border-t">
                            <Button 
                              onClick={handleBooking}
                              className="w-full text-lg py-6"
                              disabled={!clientName || !clientPhone || !bookingDate || !bookingTime || !bookingStudio}
                            >
                              <Icon name="Calendar" size={20} className="mr-2" />
                              Отправить заявку на бронирование
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300">
                <Icon name="Play" size={20} className="mr-2" />
                Послушать работы
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/3 left-1/4 animate-float">
          <Icon name="Music" size={32} className="text-primary/30" />
        </div>
        <div className="absolute top-2/3 right-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <Icon name="Headphones" size={28} className="text-primary/30" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-r from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный цикл работы с звуком — от записи до финального мастеринга
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/20 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon name={service.icon as any} size={32} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                  <Badge variant="secondary" className="text-lg px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Studios Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Наши студии</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Современные звукозаписывающие студии с профессиональным оборудованием
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {studios.map((studio, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group animate-slide-up" style={{ animationDelay: `${index * 0.3}s` }}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={studio.image} 
                    alt={studio.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">{studio.name}</h3>
                  <p className="text-muted-foreground mb-4">{studio.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {studio.equipment.map((item, idx) => (
                      <Badge key={idx} variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section with Audio Player */}
      <section className="py-20 bg-gradient-to-r from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Наше портфолио</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Послушайте работы, записанные в нашей студии
            </p>
          </div>

          <Card className="max-w-4xl mx-auto shadow-2xl border-2 animate-fade-in">
            <CardContent className="p-8">
              <div className="space-y-4">
                {portfolioTracks.map((track) => (
                  <div key={track.id} className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:bg-muted/50 ${currentTrack === track.id ? 'bg-primary/10 border border-primary/20' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playTrack(track.id)}
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        {currentTrack === track.id && isPlaying ? 
                          <Icon name="Pause" size={20} className="text-primary" /> : 
                          <Icon name="Play" size={20} className="text-primary" />
                        }
                      </Button>
                      <div>
                        <h4 className="font-semibold">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="bg-primary/5">
                        {track.genre}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-mono">
                        {track.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {currentTrack && (
                <div className="mt-6 p-4 bg-muted/30 rounded-lg animate-fade-in">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          {portfolioTracks.find(t => t.id === currentTrack)?.title}
                        </span>
                        <span className="text-xs text-muted-foreground">0:00 / {portfolioTracks.find(t => t.id === currentTrack)?.duration}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Цены</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Прозрачное ценообразование без скрытых комиссий
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="relative hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Базовый</h3>
                <div className="text-4xl font-bold text-primary mb-4">2500₽<span className="text-lg font-normal text-muted-foreground">/час</span></div>
                <ul className="space-y-3 mb-6 text-left">
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" /> Запись 1 инструмента</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" /> Базовая обработка</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" /> Звукоинженер</li>
                </ul>
                <Button className="w-full">Выбрать</Button>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-primary animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">Популярный</Badge>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Профессиональный</h3>
                <div className="text-4xl font-bold text-primary mb-4">4000₽<span className="text-lg font-normal text-muted-foreground">/час</span></div>
                <ul className="space-y-3 mb-6 text-left">
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" /> Многодорожечная запись</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" /> Сведение включено</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" /> Опытный продюсер</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" /> Все студии доступны</li>
                </ul>
                <Button className="w-full">Выбрать</Button>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Премиум</h3>
                <div className="text-4xl font-bold text-primary mb-4">6000₽<span className="text-lg font-normal text-muted-foreground">/час</span></div>
                <ul className="space-y-3 mb-6 text-left">
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" /> Полный продакшн</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" /> Мастеринг включен</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" /> Видеосъемка процесса</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" /> Индивидуальный подход</li>
                </ul>
                <Button className="w-full">Выбрать</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Контакты</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Свяжитесь с нами для записи или консультации
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-300 animate-slide-up">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Информация для связи</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Phone" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Mail" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">info@soundwavestudio.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="MapPin" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Адрес</p>
                      <p className="text-muted-foreground">ул. Музыкальная, д. 15, Москва</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Clock" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Время работы</p>
                      <p className="text-muted-foreground">Пн-Вс: 10:00 - 22:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Быстрая запись</h3>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Ваше имя" 
                    className="w-full p-3 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  />
                  <input 
                    type="tel" 
                    placeholder="Телефон" 
                    className="w-full p-3 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  />
                  <select className="w-full p-3 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors">
                    <option>Выберите услугу</option>
                    <option>Запись вокала</option>
                    <option>Запись инструментов</option>
                    <option>Mixing & Mastering</option>
                    <option>Подкасты</option>
                  </select>
                  <textarea 
                    placeholder="Комментарий к заказу"
                    rows={3}
                    className="w-full p-3 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  ></textarea>
                  <Button className="w-full text-lg py-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить заявку
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Icon name="Radio" size={32} className="text-primary mr-3" />
              <span className="text-xl font-bold">SoundWave Studio</span>
            </div>
            <div className="flex space-x-6">
              <Icon name="Instagram" size={24} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              <Icon name="Youtube" size={24} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              <Icon name="Phone" size={24} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SoundWave Studio. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}