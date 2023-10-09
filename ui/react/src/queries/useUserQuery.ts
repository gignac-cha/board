import { useQuery } from '@tanstack/react-query';
import { getUser, getUserMe } from '../utilities/request';

interface UseUserMeQueryProperties {
  requestToken?: string;
}

export const useUserMeQuery = ({ requestToken }: UseUserMeQueryProperties) =>
  useQuery<User | undefined>({
    queryKey: ['user', 'me'],
    queryFn: () => getUserMe({ requestToken }),
    enabled: !!requestToken,
    suspense: true,
  });

interface UseUserQueryProperties {
  user: UserLike;
}

export const useUserQuery = ({ user }: UseUserQueryProperties) =>
  useQuery<User | undefined>({
    queryKey: ['user', user.uuid],
    queryFn: () => getUser({ user }),
    enabled: !!user.uuid,
  });
