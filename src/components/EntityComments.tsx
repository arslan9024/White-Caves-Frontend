import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Trash2 } from 'lucide-react';
import { useRealTimeKPIs } from '../hooks/useRealTimeKPIs';
import { createLogger } from '../utils/logger';
import {
  Container,
  Header,
  CommentThread,
  CommentBubble,
  CommentHeader,
  Author,
  Timestamp,
  DeleteButton,
  CommentText,
  InputContainer,
  Input,
  SendButton,
  EmptyState,
} from './EntityComments.styles';

const log = createLogger('EntityComments');

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
  replies: Comment[];
  isEdited: boolean;
}

export interface EntityCommentsProps {
  entityId: string;
  entityType: 'lead' | 'property' | 'contract' | 'task';
  currentUserId: string;
  currentUserName: string;
}

export const EntityComments: React.FC<EntityCommentsProps> = ({
  entityId,
  entityType,
  currentUserId,
  currentUserName,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { sendComment, isConnected } = useRealTimeKPIs();

  // Load initial comments
  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetch(`/api/${entityType}/${entityId}/comments`);
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments || []);
        }
      } catch (error) {
        log.error('Failed to load comments', error);
      }
    };

    loadComments();
  }, [entityId, entityType]);

  // Listen for new comments via WebSocket
  useEffect(() => {
    if (!isConnected) return;

    const handleNewComment = (comment: Comment) => {
      if (comment.id && !comments.some(c => c.id === comment.id)) {
        setComments(prev => [...prev, comment]);
      }
    };

    // Subscribe to comments channel
    sendComment(entityId, {
      type: 'subscribe',
      entityId,
      entityType,
    });

    window.addEventListener('comment:new', (event: Event) => {
      if (event instanceof CustomEvent) {
        handleNewComment(event.detail);
      }
    });

    return () => {
      window.removeEventListener('comment:new', (event: Event) => {
        if (event instanceof CustomEvent) {
          handleNewComment(event.detail);
        }
      });
    };
  }, [isConnected, entityId, entityType, sendComment, comments]);

  const handleSubmitComment = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!newComment.trim() || isLoading) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(`/api/${entityType}/${entityId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: newComment,
            authorId: currentUserId,
            authorName: currentUserName,
          }),
        });

        if (response.ok) {
          const { comment } = await response.json();
          setComments(prev => [...prev, comment]);

          // Broadcast via WebSocket
          sendComment(entityId, comment);

          setNewComment('');
        }
      } catch (error) {
        log.error('Failed to post comment', error);
      } finally {
        setIsLoading(false);
      }
    },
    [newComment, isLoading, currentUserId, currentUserName, entityId, entityType, sendComment]
  );

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      try {
        const response = await fetch(`/api/${entityType}/${entityId}/comments/${commentId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setComments(prev => prev.filter(c => c.id !== commentId));
        }
      } catch (error) {
        log.error('Failed to delete comment', error);
      }
    },
    [entityId, entityType]
  );

  const commentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <Container>
      <Header>
        <MessageCircle size={20} />
        Discussion ({comments.length})
      </Header>

      <CommentThread>
        <AnimatePresence>
          {comments.length === 0 ? (
            <EmptyState>No comments yet. Start the conversation!</EmptyState>
          ) : (
            comments.map(comment => (
              <CommentBubble
                key={comment.id}
                $isOwn={comment.authorId === currentUserId}
                variants={commentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <CommentHeader>
                  <Author>{comment.authorName}</Author>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Timestamp>{new Date(comment.createdAt).toLocaleTimeString()}</Timestamp>
                    {comment.authorId === currentUserId && (
                      <DeleteButton onClick={() => handleDeleteComment(comment.id)} type="button">
                        <Trash2 size={14} />
                      </DeleteButton>
                    )}
                  </div>
                </CommentHeader>
                <CommentText>{comment.content}</CommentText>
                {comment.isEdited && <Timestamp style={{ fontSize: '11px' }}>(edited)</Timestamp>}
              </CommentBubble>
            ))
          )}
        </AnimatePresence>
      </CommentThread>

      <InputContainer onSubmit={handleSubmitComment}>
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          disabled={isLoading || !isConnected}
        />
        <SendButton
          type="submit"
          disabled={!newComment.trim() || isLoading || !isConnected}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send size={16} />
        </SendButton>
      </InputContainer>
    </Container>
  );
};

export default EntityComments;
