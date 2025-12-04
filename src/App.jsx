import React, { useState, useEffect } from 'react';
import { Home, Search, PlusSquare, User, MessageCircle, Play, Heart, Bookmark, Share2, Award, Book, X, Check, TrendingUp, Moon, Sun, Gamepad2Icon } from 'lucide-react';
import './index.css';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [watchTime, setWatchTime] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userXP, setUserXP] = useState(0);
  const [flashcards, setFlashcards] = useState([]);
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);
  const [showQnAModal, setShowQnAModal] = useState(false);
  const [qnaList, setQnaList] = useState([]);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [savedVideos, setSavedVideos] = useState(new Set());
  const [following, setFollowing] = useState(new Set());
  const [darkMode, setDarkMode] = useState(true);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sample data
  const sampleVideos = [
    { id: 1, creator: 'Dr. Sarah Chen', avatar: '👩‍🔬', title: 'Quantum Computing Basics', topic: 'Physics', xp: 10, views: '12.5K', duration: '60s', thumbnail: '🔬' },
    { id: 2, creator: 'CodeMaster Mike', avatar: '👨‍💻', title: 'React Hooks in 60 Seconds', topic: 'Programming', xp: 15, views: '25.3K', duration: '60s', thumbnail: '⚛️' },
    { id: 3, creator: 'Math Wizard Emma', avatar: '👩‍🏫', title: 'Linear Algebra Simplified', topic: 'Mathematics', xp: 12, views: '18.7K', duration: '75s', thumbnail: '📐' },
    { id: 4, creator: 'Design Guru Alex', avatar: '🎨', title: 'UI Design Principles', topic: 'Design', xp: 10, views: '32.1K', duration: '45s', thumbnail: '🎨' },
    { id: 5, creator: 'Business Pro Lisa', avatar: '💼', title: 'Marketing Strategy 101', topic: 'Business', xp: 20, views: '41.2K', duration: '90s', thumbnail: '📊' },
  ];

  const sampleCourses = [
    { id: 1, title: 'Complete Python Mastery', creator: 'CodeMaster Mike', videos: 24, duration: '24 min', level: 'Beginner', thumbnail: '🐍' },
    { id: 2, title: 'Data Science Fundamentals', creator: 'Dr. Sarah Chen', videos: 18, duration: '18 min', level: 'Intermediate', thumbnail: '📊' },
    { id: 3, title: 'UI/UX Design Sprint', creator: 'Design Guru Alex', videos: 15, duration: '15 min', level: 'Beginner', thumbnail: '🎨' },
  ];

  const quizQuestions = [
    { question: 'What is a React Hook?', options: ['A function', 'A class', 'A component', 'A library'], correct: 0 },
    { question: 'Which principle is key in UI design?', options: ['Complexity', 'Consistency', 'Randomness', 'Confusion'], correct: 1 },
  ];

  // Watch time tracker
  useEffect(() => {
    let timer;
    if (showVideoPlayer) {
      timer = setInterval(() => {
        setWatchTime(prev => {
          const newTime = prev + 1;
          if (newTime >= 1800 && newTime % 1800 === 0) {
            setShowQuiz(true);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showVideoPlayer]);

  const handleVideoComplete = (video) => {
    setUserXP(prev => prev + video.xp);
    setShowVideoPlayer(false);
  };

  const toggleLike = (videoId) => {
    const newLiked = new Set(likedVideos);
    if (newLiked.has(videoId)) {
      newLiked.delete(videoId);
    } else {
      newLiked.add(videoId);
    }
    setLikedVideos(newLiked);
  };

  const toggleSave = (videoId) => {
    const newSaved = new Set(savedVideos);
    if (newSaved.has(videoId)) {
      newSaved.delete(videoId);
    } else {
      newSaved.add(videoId);
    }
    setSavedVideos(newSaved);
  };

  const toggleFollow = (creator) => {
    const newFollowing = new Set(following);
    if (newFollowing.has(creator)) {
      newFollowing.delete(creator);
    } else {
      newFollowing.add(creator);
    }
    setFollowing(newFollowing);
  };

  const addQuestion = (videoId, question) => {
    if (!question) return;
    setQnaList(prev => [...prev, { id: Date.now(), videoId, user: 'You', question, answer: '' }]);
  };

  const addFlashcard = (front, back) => {
    setFlashcards([...flashcards, { id: Date.now(), front, back }]);
    setShowFlashcardModal(false);
  };

  // Create View
  const CreateView = () => (
    <div className="main-content">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">➕</div>

          <div className="profile-details">
            <h1 className="profile-name">Create Content</h1>
            <p className="profile-bio">Upload videos, share micro-lessons, and earn XP!</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Start Creating</h2>

        <div className="create-options">

          <div className="course-card">
            <div className="course-thumbnail">🎥</div>
            <div className="course-info">
              <h3 className="course-title">Upload Video</h3>
              <p className="course-creator">Teach something awesome</p>
              <div className="course-meta">
                <span>MP4</span>
                <span>Short videos</span>
                <span className="level-badge">Create</span>
              </div>
            </div>
          </div>

          <div className="course-card">
            <div className="course-thumbnail">📝</div>
            <div className="course-info">
              <h3 className="course-title">Write Micro-Lesson</h3>
              <p className="course-creator">Simple text lessons</p>
              <div className="course-meta">
                <span>Fast</span>
                <span>High engagement</span>
                <span className="level-badge">Write</span>
              </div>
            </div>
          </div>

          <div className="course-card">
            <div className="course-thumbnail">📚</div>
            <div className="course-info">
              <h3 className="course-title">Create Flashcards Set</h3>
              <p className="course-creator">Share study material</p>
              <div className="course-meta">
                <span>Custom</span>
                <span>Smart learning</span>
                <span className="level-badge">Study</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  // Games View
  const GamesView = () => (
    <div className="main-content">

      {/* Header */}
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">🎮</div>

          <div className="profile-details">
            <h1 className="profile-name">Learning Games</h1>
            <p className="profile-bio">
              Boost your skills with fun micro-games!
            </p>

            <div className="profile-stats">
              <div className="stat">
                <p className="stat-value">{userXP}</p>
                <p className="stat-label">Total XP</p>
              </div>
              <div className="stat">
                <p className="stat-value">{flashcards.length}</p>
                <p className="stat-label">Flashcards</p>
              </div>
              <div className="stat">
                <p className="stat-value">{Math.floor(watchTime / 60)}</p>
                <p className="stat-label">Minutes Learned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card stat-purple">
            <Gamepad2Icon className="stat-icon" />
            <p className="stat-number">3</p>
            <p className="stat-text">Games Available</p>
          </div>

          <div className="stat-card stat-blue">
            <Award className="stat-icon" />
            <p className="stat-number">2</p>
            <p className="stat-text">Badges Earned</p>
          </div>

          <div className="stat-card stat-green">
            <TrendingUp className="stat-icon" />
            <p className="stat-number">{userXP}</p>
            <p className="stat-text">XP Earned</p>
          </div>
        </div>
      </div>

      {/* Games List */}
      <div className="section">
        <h2 className="section-title">Mini Games</h2>

        <div className="course-grid">

          <div className="course-card">
            <div className="course-thumbnail">🧠</div>
            <div className="course-info">
              <h3 className="course-title">Flashcard Memory</h3>
              <p className="course-creator">Boost retention</p>
              <div className="course-meta">
                <span>Speed</span>
                <span>XP Bonus</span>
                <span className="level-badge">Easy</span>
              </div>
            </div>
          </div>

          <div className="course-card">
            <div className="course-thumbnail">⚡</div>
            <div className="course-info">
              <h3 className="course-title">Rapid Quiz</h3>
              <p className="course-creator">Think fast!</p>
              <div className="course-meta">
                <span>10 questions</span>
                <span>+50 XP</span>
                <span className="level-badge">Medium</span>
              </div>
            </div>
          </div>

          <div className="course-card">
            <div className="course-thumbnail">🎯</div>
            <div className="course-info">
              <h3 className="course-title">Accuracy Challenge</h3>
              <p className="course-creator">Test knowledge</p>
              <div className="course-meta">
                <span>Time-bound</span>
                <span>High reward</span>
                <span className="level-badge">Hard</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );

  // Navigation Bar
  const NavBar = () => (
    <div className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <div className="logo-icon">M</div>
          <span className="logo-text">Microversity</span>
        </div>
        <div className="nav-actions">
          <div className="xp-badge">
            <Award className="icon-sm" />
            {userXP} XP
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="icon-btn">
            {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
          </button>
          <button onClick={() => setCurrentView('profile')} className={`nav-item ${currentView === 'profile' ? 'active' : ''}`}>
            <User className="icon" />
          </button>
        </div>
      </div>
    </div>
  );

  // Bottom Navigation
  const BottomNav = () => (
    <div className="bottom-nav">
      <div className="bottom-nav-container">
        <button onClick={() => setCurrentView('home')} className={`nav-item ${currentView === 'home' ? 'active' : ''}`}>
          <Home className="icon" />
          <span className="nav-label">Home</span>
        </button>
        <button onClick={() => setCurrentView('discover')} className={`nav-item ${currentView === 'discover' ? 'active' : ''}`}>
          <Search className="icon" />
          <span className="nav-label">Discover</span>
        </button>
        <button onClick={() => setCurrentView('create')} className="nav-item">
          <div className="create-btn">
            <PlusSquare className="icon text-white" />
          </div>
        </button>
        <button onClick={() => setCurrentView('messages')} className={`nav-item ${currentView === 'messages' ? 'active' : ''}`}>
          <MessageCircle className="icon" />
          <span className="nav-label">Chat</span>
        </button>
        <button onClick={() => setCurrentView('games')} className={`nav-item ${currentView === 'games' ? 'active' : ''}`}>
          <Gamepad2Icon className="icon" />
          <span className="nav-label">Games</span>
        </button>

      </div>
    </div>
  );

  // Video Card Component
  const VideoCard = ({ video }) => (
    <div className="video-card">
      <div className="video-header">
        <div className="creator-info">
          <div className="avatar">{video.avatar}</div>
          <div>
            <p className="creator-name">{video.creator}</p>
            <p className="views">{video.views} views</p>
          </div>
        </div>
        <button
          onClick={() => toggleFollow(video.creator)}
          className={`follow-btn ${following.has(video.creator) ? 'following' : ''}`}
        >
          {following.has(video.creator) ? 'Following' : 'Follow'}
        </button>
      </div>

      <div onClick={() => { setCurrentVideo(video); setShowVideoPlayer(true); }} className="video-thumbnail">
        <div className="thumbnail-emoji">{video.thumbnail}</div>
        <div className="play-overlay">
          <div className="play-button">
            <Play className="play-icon" />
          </div>
        </div>
        <div className="duration-badge">{video.duration}</div>
      </div>

      <div className="video-content">
        <h3 className="video-title">{video.title}</h3>
        <div className="video-tags">
          <span className="tag tag-topic">{video.topic}</span>
          <span className="tag tag-xp">
            <Award className="tag-icon" />
            {video.xp} XP
          </span>
        </div>

        <div className="video-actions">
          <button
            onClick={() => toggleLike(video.id)}
            className={`action-btn ${likedVideos.has(video.id) ? 'liked' : ''}`}
          >
            <Heart className={`action-icon ${likedVideos.has(video.id) ? 'filled' : ''}`} />
            <span>Like</span>
          </button>
          <button
            onClick={() => toggleSave(video.id)}
            className={`action-btn ${savedVideos.has(video.id) ? 'saved' : ''}`}
          >
            <Bookmark className={`action-icon ${savedVideos.has(video.id) ? 'filled' : ''}`} />
            <span>Save</span>
          </button>
          <button className="action-btn">
            <Share2 className="action-icon" />
            <span>Share</span>
          </button>
          <button
            onClick={() => { setCurrentVideo(video); setShowQnAModal(true); }}
            className="action-btn qna"
          >
            <MessageCircle className="action-icon" />
            <span>QnA</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Home View
  const HomeView = () => (
    <div className="main-content">
      <div className="topic-filters">
        {['All', 'Physics', 'Programming', 'Mathematics', 'Design', 'Business'].map(topic => (
          <button key={topic} className={`filter-btn ${topic === 'All' ? 'active' : ''}`}>
            {topic}
          </button>
        ))}
      </div>

      {sampleVideos.map(video => <VideoCard key={video.id} video={video} />)}
    </div>
  );

  // Discover View
  const DiscoverView = () => (
    <div className="main-content wide">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search topics, creators, courses..."
          className="search-input"
        />
      </div>

      <div className="section">
        <h2 className="section-title">Trending Courses</h2>
        <div className="course-grid">
          {sampleCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-thumbnail">{course.thumbnail}</div>
              <div className="course-info">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-creator">{course.creator}</p>
                <div className="course-meta">
                  <span>{course.videos} videos</span>
                  <span>{course.duration}</span>
                  <span className="level-badge">{course.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Messages View
  const MessagesView = () => (
    <div className="main-content">
      <h1 className="page-title">Messages</h1>
      <div className="messages-list">
        {[
          { name: 'Dr. Sarah Chen', avatar: '👩‍🔬', message: 'Great question about quantum computing!', time: '2m ago', unread: true },
          { name: 'CodeMaster Mike', avatar: '👨‍💻', message: 'Check out my new React series', time: '1h ago', unread: true },
          { name: 'Study Group', avatar: '👥', message: 'Anyone up for a coding session?', time: '3h ago', unread: false },
        ].map((chat, idx) => (
          <div key={idx} className={`message-item ${chat.unread ? 'unread' : ''}`}>
            <div className="message-avatar">{chat.avatar}</div>
            <div className="message-content">
              <div className="message-header">
                <h3 className="message-name">{chat.name}</h3>
                <span className="message-time">{chat.time}</span>
              </div>
              <p className="message-text">{chat.message}</p>
            </div>
            {chat.unread && <div className="unread-dot"></div>}
          </div>
        ))}
      </div>
    </div>
  );

  // Profile View
  const ProfileView = () => (
    <div className="main-content">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">ME</div>
          <div className="profile-details">
            <h1 className="profile-name">My Learning Journey</h1>
            <p className="profile-bio">Passionate about learning and teaching!</p>
            <div className="profile-stats">
              <div className="stat">
                <p className="stat-value">{following.size}</p>
                <p className="stat-label">Following</p>
              </div>
              <div className="stat">
                <p className="stat-value">{savedVideos.size}</p>
                <p className="stat-label">Saved</p>
              </div>
              <div className="stat">
                <p className="stat-value">{userXP}</p>
                <p className="stat-label">Total XP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-purple">
            <Play className="stat-icon" />
            <p className="stat-number">{likedVideos.size}</p>
            <p className="stat-text">Videos Watched</p>
          </div>
          <div className="stat-card stat-blue">
            <Book className="stat-icon" />
            <p className="stat-number">0</p>
            <p className="stat-text">Courses Done</p>
          </div>
          <div className="stat-card stat-green">
            <Award className="stat-icon" />
            <p className="stat-number">{flashcards.length}</p>
            <p className="stat-text">Flashcards</p>
          </div>
          <div className="stat-card stat-orange">
            <TrendingUp className="stat-icon" />
            <p className="stat-number">{Math.floor(watchTime / 60)}</p>
            <p className="stat-text">Minutes Learned</p>
          </div>
        </div>
      </div>

      <div className="flashcards-section">
        <div className="section-tabs">
          <button className="tab active">Flashcards ({flashcards.length})</button>
          <button className="tab">Playlists (0)</button>
          <button className="tab">XP History</button>
        </div>

        <div className="flashcards-content">
          {flashcards.length === 0 ? (
            <div className="empty-state">
              <Award className="empty-icon" />
              <p className="empty-title">No flashcards yet</p>
              <p className="empty-text">Create flashcards while watching videos!</p>
            </div>
          ) : (
            flashcards.map(card => (
              <div key={card.id} className="flashcard">
                <p className="flashcard-front">{card.front}</p>
                <p className="flashcard-back">{card.back}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // Video Player Modal
  const VideoPlayerModal = () => (
    <div className="modal-overlay video-player">
      <div className="player-header">
        <button onClick={() => setShowVideoPlayer(false)} className="close-btn">
          <X className="icon" />
        </button>
        <button onClick={() => setShowFlashcardModal(true)} className="flashcard-btn">
          Create Flashcard
        </button>
      </div>

      <div className="player-content">
        <div className="player-video">
          <div className="player-emoji">{currentVideo?.thumbnail}</div>
          <h2 className="player-title">{currentVideo?.title}</h2>
          <p className="player-creator">by {currentVideo?.creator}</p>
          <button
            onClick={() => handleVideoComplete(currentVideo)}
            className="complete-btn"
          >
            <Check className="icon-sm" />
            Complete & Earn {currentVideo?.xp} XP
          </button>
        </div>
      </div>

      <div className="player-actions">
        <button className="player-action-btn">
          <Heart className="icon-sm" />
          Like
        </button>
        <button className="player-action-btn">
          <Bookmark className="icon-sm" />
          Save
        </button>
        <button className="player-action-btn">
          <Share2 className="icon-sm" />
          Share
        </button>
        <button
          onClick={() => setShowQnAModal(true)}
          className="player-action-btn qna"
        >
          <MessageCircle className="icon-sm" />
          QnA
        </button>
      </div>
    </div>
  );

  // Flashcard Modal
  const FlashcardModal = () => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h3 className="modal-title">Create Flashcard</h3>
            <button onClick={() => setShowFlashcardModal(false)} className="close-btn">
              <X className="icon-sm" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Question/Front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            className="modal-input"
          />
          <textarea
            placeholder="Answer/Back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            className="modal-textarea"
          />
          <button
            onClick={() => addFlashcard(front, back)}
            disabled={!front || !back}
            className="modal-btn"
          >
            Save Flashcard
          </button>
        </div>
      </div>
    );
  };

  // Quiz Modal
  const QuizModal = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);

    return (
      <div className="modal-overlay">
        <div className="modal">
          {currentQ < quizQuestions.length ? (
            <>
              <h3 className="modal-title">Quick Quiz! Question {currentQ + 1}/2</h3>
              <p className="quiz-question">{quizQuestions[currentQ].question}</p>
              <div className="quiz-options">
                {quizQuestions[currentQ].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (idx === quizQuestions[currentQ].correct) setScore(score + 1);
                      setCurrentQ(currentQ + 1);
                    }}
                    className="quiz-option"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="quiz-complete-title">Quiz Complete!</h3>
              <p className="quiz-score">You scored {score}/2</p>
              <button
                onClick={() => { setShowQuiz(false); setCurrentQ(0); setScore(0); setUserXP(userXP + 50); }}
                className="modal-btn"
              >
                Claim 50 XP Bonus
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  // QnA Modal
  const QnAModal = () => {
    const [question, setQuestionLocal] = useState('');
    const videoId = currentVideo?.id;
    const qnas = qnaList.filter(q => q.videoId === videoId);

    return (
      <div className="modal-overlay">
        <div className="modal qna-modal">
          <div className="modal-header">
            <h3 className="modal-title">Q&A — {currentVideo?.title}</h3>
            <button onClick={() => setShowQnAModal(false)} className="close-btn">
              <X className="icon-sm" />
            </button>
          </div>

          <div className="qna-list">
            {qnas.length === 0 ? (
              <p className="empty-text">No questions yet — be the first to ask!</p>
            ) : (
              qnas.map(item => (
                <div key={item.id} className="qna-item">
                  <p className="qna-user">{item.user}</p>
                  <p className="qna-question">{item.question}</p>
                  {item.answer && <p className="qna-answer">Answer: {item.answer}</p>}
                </div>
              ))
            )}
          </div>

          <input
            type="text"
            placeholder="Ask a question about this video..."
            value={question}
            onChange={(e) => setQuestionLocal(e.target.value)}
            className="modal-input qna-input"
          />
          <button
            onClick={() => {
              addQuestion(videoId, question);
              setQuestionLocal('');
            }}
            disabled={!question}
            className="modal-btn"
          >
            Post Question
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <NavBar />

      {currentView === 'home' && <HomeView />}
      {currentView === 'discover' && <DiscoverView />}
      {currentView === 'messages' && <MessagesView />}
      {currentView === 'profile' && <ProfileView />}
      {currentView === 'games' && <GamesView />}
      {currentView === 'create' && <CreateView />}

      <BottomNav />

      {showVideoPlayer && <VideoPlayerModal />}
      {showFlashcardModal && <FlashcardModal />}
      {showQuiz && <QuizModal />}
      {showQnAModal && <QnAModal />}
    </div>
  );
};

export default App;