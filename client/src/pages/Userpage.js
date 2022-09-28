import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookList, getMember, getDiaries } from '../lib/axios';
import { borderRadius, space, fontSize, colors } from '../assets/styles/theme';
import Avatar from '../components/common/Avatar';
import styled from 'styled-components';
import DiaryCard from '../components/common/DiaryCard';
// 로그인 기능 추가시 주석해제 로직 변경
// import { FiSettings } from 'react-icons/fi';

const UserpageContainer = styled.div`
  padding: ${space.spaceL};
  padding-top: 0;
`;

const UserInfoContainer = styled.div`
  display: flex;

  > div {
    margin-left: ${space.spaceM};
    align-self: flex-end;
  }

  > div > p {
    padding-bottom: ${space.spaceM};
    color: ${colors.text4};
  }

  > div > p:first-child {
    font-size: ${fontSize.fontSizeL};
    color: ${colors.text2};
  }

  > div > div {
    display: flex;
    padding-bottom: ${space.spaceM};
    color: ${colors.text3};
  }

  > div > div > svg {
    margin-left: ${space.spaceS};
  }

  > div > div > svg:hover {
    color: ${colors.text2};
  }

  > div > div > p:last-child {
    font-size: ${fontSize.fontSizeS};
  }
`;

const AvatarContainer = styled.div`
  position: relative;

  > svg {
    position: absolute;
    cursor: pointer;
    top: 10px;
    left: 190px;
  }
`;

const ContentContainer = styled.div`
  padding: ${space.spaceM};
  padding-top: ${space.spaceL};
`;

const BookAndDiaries = styled.div`
  position: relative;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  border-bottom: 1px solid #000;

  > div:last-child {
    display: flex;
    gap: ${space.spaceM};
    padding: ${space.spaceM};
  }
`;

const Userpage = ({ setHeaderData }) => {
  const { memberId } = useParams();
  const [user, setUser] = useState([]);
  const [books, setBooks] = useState([]);
  const [diaries, setDiaries] = useState([]);

  useEffect(async () => {
    const resUser = await getMember(memberId);
    setUser(resUser.data);
    setHeaderData({
      title: `${resUser.data.nickname}님의 서랍`,
      // 로그인 기능 추가시 description 로직 변경
      description: `${resUser.data.nickname}님의 서랍입니다. ${resUser.data.nickname}님의 기록들을 읽어보세요.`,
    });
    const resBooks = await getBookList(memberId);
    setBooks(resBooks.data);
    const resDiaries = await getDiaries();
    setDiaries(resDiaries.data.slice(5));
  }, [memberId]);
  return (
    <UserpageContainer>
      {console.log(diaries)}
      <UserInfoContainer>
        <AvatarContainer>
          <Avatar
            imageURL={user.profile}
            width={'183px'}
            height={'197px'}
            borderRadius={borderRadius.borderRadiusM}
            isShadow={true}
          />
          {/* 로그인 기능 추가시 프로필 사진 변경 로직 변경 */}
          {/* {<FiSettings />} */}
        </AvatarContainer>
        <div>
          <p>{user.name}</p>
          <p>{user.nickname}</p>
          <div>
            {/* 로그인 기능 추가시 자기소개 글 변경 로직 변경 */}
            <p>{user.imfomation}</p> {/* {<FiSettings />} */}
          </div>
        </div>
      </UserInfoContainer>
      <ContentContainer>
        {books.map((e) => (
          <BookAndDiaries key={e.id}>
            <div></div>
            <div>
              <div>{e.title}</div>
            </div>
            <div>
              {diaries.map((e) => (
                <DiaryCard
                  key={e.diaryId}
                  image={e.diaryimage}
                  title={e.title}
                ></DiaryCard>
              ))}
            </div>
          </BookAndDiaries>
        ))}
      </ContentContainer>
    </UserpageContainer>
  );
};

export default Userpage;
