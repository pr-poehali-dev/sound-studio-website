import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState, useRef } from 'react';

export default function Index() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const portfolioTracks = [
    { id: 1, title: "Electronic Dreams", artist: "DJ Aurora", duration: "3:24", genre: "Electronic" },
    { id: 2, title: "Acoustic Sessions", artist: "Indie Band", duration: "4:12", genre: "Acoustic" },
    { id: 3, title: "Urban Vibes", artist: "Hip-Hop Artist", duration: "3:45", genre: "Hip-Hop" },
    { id: 4, title: "Rock Anthem", artist: "The Rockers", duration: "4:33", genre: "Rock" }
  ];

  const services = [
    { icon: "Mic", title: "Запись вокала", description: "Профессиональная запись вокальных партий в акустически обработанной студии", price: "от 3000₽" },
    { icon: "Music", title: "Запись инструментов", description: "Качественная запись гитар, барабанов, клавишных и других инструментов", price: "от 2500₽" },
    { icon: "Headphones", title: "Mixing & Mastering", description: "Сведение и мастеринг ваших треков до профессионального уровня", price: "от 5000₽" },
    { icon: "Radio", title: "Подкасты", description: "Запись и обработка подкастов, аудиокниг и рекламных роликов", price: "от 2000₽" }
  ];

  const studios = [
    { name: "Studio A", description: "Основная студия с Neumann U87, SSL консолью", equipment: ["SSL 4000E", "Neumann U87", "ProTools HDX"], image: "/img/5f0f6b5e-144f-41c1-b3f8-d029cadbaa7d.jpg" },
    { name: "Studio B", description: "Вокальная кабина с топовым оборудованием", equipment: ["Avalon VT-737", "AKG C414", "Logic Pro"], image: "/img/f9214b48-110f-42eb-898e-c605978dcbf9.jpg" }
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
              <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Icon name="Calendar" size={20} className="mr-2" />
                Забронировать студию
              </Button>
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